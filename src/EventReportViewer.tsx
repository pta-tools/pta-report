import { Box, Button, HStack, Heading, Spacer, Text, VStack } from "@chakra-ui/react";
import jsPDF from "jspdf";
import eventReportStore from "./EventReportStore";
import { useNavigate } from "react-router-dom";

function EventReportViewer() {
    const navigate = useNavigate();

    const eventName = eventReportStore.valueSubject.value.eventName;
    const familyName = eventReportStore.valueSubject.value.familyName;
    const givenName = eventReportStore.valueSubject.value.givenName;
    const year = eventReportStore.valueSubject.value.year;
    const month = eventReportStore.valueSubject.value.month;
    const day = eventReportStore.valueSubject.value.day;
    const eventContent = eventReportStore.valueSubject.value.eventContent;
    const impressions = eventReportStore.valueSubject.value.impressions;
    const additionalHeading = eventReportStore.valueSubject.value.additionalHeading;
    const additionalText = eventReportStore.valueSubject.value.additionalText;

    function back() {
        navigate(-1);
    }

    function makePDF() {
        const doc = new jsPDF({
            orientation: "p",
            unit: "mm",
            format: "a4"
        });

        doc.addFont("/fonts/NotoSansJP-Regular.ttf", "NotoSansJP", "normal");
        doc.setFont("NotoSansJP");

        // タイトル
        doc.setFontSize(18);
        doc.text(`${eventName} 参加報告書`, 105, 25, { align: "center" });

        // 作成者と参加日
        doc.setFontSize(10);
        doc.text(`作成者: ${familyName} ${givenName}`, 200, 35, { align: "right" });
        doc.text(`参加日: ${year}年${month}月${day}日`, 200, 40, { align: "right" });

        // イベントの内容
        let currentHeight = 55;
        doc.setFontSize(14);
        doc.text("イベントの内容", 15, currentHeight);
        doc.setFontSize(12);
        currentHeight += 10;
        doc.text(eventContent, 15, currentHeight, { maxWidth: 180 });

        // 次のセクションへの余白を調整
        const contentHeight = doc.getTextDimensions(eventContent, { maxWidth: 180 }).h;
        currentHeight += contentHeight + 15;

        // イベントに参加した感想
        doc.setFontSize(14);
        doc.text("イベントに参加した感想", 15, currentHeight);
        doc.setFontSize(12);
        currentHeight += 10;
        doc.text(impressions, 15, currentHeight, { maxWidth: 180 });

        // 追加テキストがある場合の処理
        const impressionsHeight = doc.getTextDimensions(impressions, { maxWidth: 180 }).h;
        currentHeight += impressionsHeight + 15;
        if (additionalHeading) {
            doc.setFontSize(14);
            doc.text(additionalHeading, 15, currentHeight);
            doc.setFontSize(12);
            currentHeight += 10;
            doc.text(additionalText, 15, currentHeight, { maxWidth: 180 });
        }

        // PDFを保存
        doc.save(`${eventName}_参加報告書.pdf`);
    }

    return (
        <VStack w="full" overflow="visible" spacing={4}>
            <Box borderWidth="1px" mx="auto">
                <Box id="pdf" w="210mm" h="297mm" p="15mm" overflow="hidden">
                    <VStack w="full" spacing="5mm" alignItems="start">
                        <Heading as="h1" alignSelf="center" fontSize="18pt">{eventName} 参加報告書</Heading>
                        <VStack w="full" spacing="0">
                            <Text alignSelf="end" fontSize="10pt">作成者: {familyName} {givenName}</Text>
                            <Text alignSelf="end" fontSize="10pt">参加日: {year}年{month}月{day}日</Text>
                        </VStack>
                        <VStack w="full" alignItems="start" spacing="2mm">
                            <Heading as="h2" fontSize="14pt">イベントの内容</Heading>
                            <Text fontSize="12pt" whiteSpace="pre-wrap">{eventContent}</Text>
                        </VStack>
                        <VStack w="full" alignItems="start" spacing="2mm">
                            <Heading as="h2" fontSize="14pt">イベントに参加した感想</Heading>
                            <Text fontSize="12pt" whiteSpace="pre-wrap">{impressions}</Text>
                        </VStack>
                        {additionalHeading && (
                            <VStack w="full" alignItems="start" spacing="2mm">
                                <Heading as="h2" fontSize="14pt">{additionalHeading}</Heading>
                                <Text fontSize="12pt" whiteSpace="pre-wrap">{additionalText}</Text>
                            </VStack>
                        )}
                    </VStack>
                </Box>
            </Box>
            <HStack w="full">
                <Button onClick={back}>戻る</Button>
                <Spacer />
                <Button colorScheme="blue" onClick={makePDF}>PDFをダウンロード</Button>
            </HStack>
        </VStack>
    );
}

export default EventReportViewer;