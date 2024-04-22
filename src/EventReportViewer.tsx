import { Box, Button, HStack, Heading, Spacer, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import eventReportStore from "./EventReportStore";
import downloadPDF from "./makePDF";

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
                <Button colorScheme="blue" onClick={() => downloadPDF(eventReportStore.valueSubject.value)}>PDFをダウンロード</Button>
            </HStack>
        </VStack>
    );
}

export default EventReportViewer;