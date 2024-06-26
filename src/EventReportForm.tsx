import { Box, Button, FormControl, FormLabel, Heading, Input, Select, Text, Textarea, VStack, chakra } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRevalidator } from "react-router-dom";
import eventReportStore from "./EventReportStore";
import downloadPDF from "./makePDF";

const now = new Date();

function FieldSet(props: { caption: string, helperText?: string, children: React.ReactNode }) {
    const { caption, helperText, children } = props;
    return (
        <Box as="fieldset" w="full">
            <VStack w="full" alignItems="start" spacing={1}>
                <legend><Text fontWeight="semibold">{caption}</Text></legend>
                {helperText && <Text>{helperText}</Text>}
                {children}
            </VStack>
        </Box>
    );
}

function EventReportForm(props: { showReport: () => void }) {
    // const { showReport } = props;
    const {} = props;

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

    const setEventName = (value: string) => eventReportStore.setEventName(value);
    const setFamilyName = (value: string) => eventReportStore.setFamilyName(value);
    const setGivenName = (value: string) => eventReportStore.setGivenName(value);
    const setYear = (value: string) => eventReportStore.setYear(value);
    const setMonth = (value: string) => eventReportStore.setMonth(value);
    const setDay = (value: string) => eventReportStore.setDay(value);
    const setEventContent = (value: string) => eventReportStore.setEventContent(value);
    const setImpressions = (value: string) => eventReportStore.setImpressions(value);
    const setAdditionalHeading = (value: string) => eventReportStore.setAdditionalHeading(value);
    const setAdditionalText = (value: string) => eventReportStore.setAdditionalText(value);

    const revalidator = useRevalidator();

    const currentYear = now.getFullYear();
    const years = Array.from({ length: 11 }, (_, index) => currentYear - 5 + index);
    if (!years.includes(Number(year))) {
        if (Number(year) < years[0]) {
            years.unshift(Number(year));
        } else {
            years.push(Number(year));
        }
    }
    const months = Array.from({ length: 12 }, (_, index) => index + 1);
    const days = Array.from({ length: 31 }, (_, index) => index + 1);

    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // showReport();
        downloadPDF(eventReportStore.valueSubject.value);
    }

    useEffect(() => {
        const subscription = eventReportStore.valueSubject.subscribe(_ => {
            revalidator.revalidate();
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <VStack w="full">
            <Heading as="h1">PTA報告書作成ツール</Heading>
            <chakra.form onSubmit={onSubmit}>
                <VStack w="full" spacing={4}>
                    <FormControl isRequired>
                        <FormLabel>イベント名</FormLabel>
                        <Input type="text" placeholder="例: ○○講習会" value={eventName} onChange={e => setEventName(e.target.value)} />
                    </FormControl>
                    <FieldSet caption="作成者氏名" helperText="複数人で作成した場合は、代表者の氏名を入力してください。">
                        <FormControl isRequired>
                            <FormLabel>姓</FormLabel>
                            <Input type="text" value={familyName} onChange={e => setFamilyName(e.target.value)} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>名</FormLabel>
                            <Input type="text" value={givenName} onChange={e => setGivenName(e.target.value)} />
                        </FormControl>
                    </FieldSet>
                    <FieldSet caption="イベント参加年月日" helperText="イベントに参加した年月日を入力してください。">
                        <FormControl isRequired>
                            <FormLabel>年</FormLabel>
                            <Select value={year} onChange={e => setYear(e.target.value)}>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>月</FormLabel>
                            <Select value={month} onChange={e => setMonth(e.target.value)}>
                                {months.map(month => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>日</FormLabel>
                            <Select value={day} onChange={e => setDay(e.target.value)}>
                                {days.map(day => (
                                    <option key={day} value={day}>{day}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </FieldSet>
                    <FormControl isRequired>
                        <FormLabel>イベントの内容</FormLabel>
                        <Textarea minH="10em" value={eventContent} onChange={e => setEventContent(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>イベントに参加した感想</FormLabel>
                        <Textarea minH="10em" value={impressions} onChange={e => setImpressions(e.target.value)} />
                    </FormControl>
                    <FieldSet caption="追加項目（オプション）" helperText="「内容」と「感想」以外に追加したい項目があれば入力してください。">
                        <FormControl>
                            <FormLabel>追加見出し</FormLabel>
                            <Input type="text" value={additionalHeading} onChange={e => setAdditionalHeading(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>追加テキスト</FormLabel>
                            <Textarea minH="10em" value={additionalText} onChange={e => setAdditionalText(e.target.value)} />
                        </FormControl>
                    </FieldSet>
                    <Button type="submit" colorScheme="blue">PDFを作成</Button>
                </VStack>
            </chakra.form>
        </VStack>
    );
}

export default EventReportForm;