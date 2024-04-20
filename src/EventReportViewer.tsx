import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import eventReportStore from "./EventReportStore";
import jsPDF from "jspdf";

function EventReportViewer() {
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

    function makePDF() {
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        const element = window.document.getElementById("pdf");
        if (element) {
            pdf.html(element, {
                callback: () => {
                    pdf.save("event-report.pdf");
                }
            });
        }
    }

    return (
        <VStack w="full" overflow="visible">
            <Box borderWidth="1px" mx="auto">
                <Box id="pdf" w="210mm" h="297mm" p="15mm" overflow="hidden">
                    <VStack w="full" spacing="5mm">
                        <Heading as="h1" fontSize="18pt">{eventName} 参加報告書</Heading>
                        <VStack w="full" spacing="0">
                            <Text alignSelf="end" fontSize="10pt">作成者: {familyName} {givenName}</Text>
                            <Text alignSelf="end" fontSize="10pt">参加日: {year}年{month}月{day}日</Text>
                        </VStack>
                        <VStack w="full" alignItems="start" spacing="2mm">
                            <Heading as="h2" fontSize="14pt">内容</Heading>
                            <Text size="12pt">{eventContent}</Text>
                        </VStack>
                        <VStack w="full" alignItems="start" spacing="2mm">
                            <Heading as="h2" fontSize="14pt">感想</Heading>
                            <Text size="12pt">{impressions}</Text>
                        </VStack>
                        {additionalHeading && (
                            <VStack w="full" alignItems="start" spacing="2mm">
                                <Heading as="h2" fontSize="14pt">{additionalHeading}</Heading>
                                <Text size="12pt">{additionalText}</Text>
                            </VStack>
                        )}
                    </VStack>
                </Box>
            </Box>
            <Button onClick={makePDF}>PDFをダウンロード</Button>
        </VStack>
    );
}

export default EventReportViewer;