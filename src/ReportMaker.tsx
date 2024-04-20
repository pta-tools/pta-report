import { Box, Button, FormControl, FormHelperText, FormLabel, Heading, Input, Select, Text, Textarea, VStack, chakra } from "@chakra-ui/react";
import { useState } from "react";

function FieldSet(props: { caption: string, helperText?: string, children: React.ReactNode }) {
    const { caption, helperText, children } = props;

    return (
        <Box as="fieldset" borderWidth="1px" borderStyle="solid" p={2} borderRadius="6px">
            <VStack w="full" alignItems="start">
                <legend><Text fontWeight="semibold">{caption}</Text></legend>
                {helperText &&
                    <Text>{helperText}</Text>
                }
                {children}
            </VStack>
        </Box>
    );
}

export function ReportMaker() {
    const [eventName, setEventName] = useState("");
    const [familyName, setFamilyName] = useState("");
    const [givenName, setGivenName] = useState("");
    const [year, setYear] = useState("-");
    const [month, setMonth] = useState("-");
    const [day, setDay] = useState("-");
    const [eventContent, setEventContent] = useState("");
    // TODO: 他のstateを追加

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

    }

    return (
        <VStack w="full">
            <Heading as="h1">PTA報告書作成ツール</Heading>
            <chakra.form onSubmit={onSubmit}>
                <VStack w="full">
                    <FormControl isRequired>
                        <FormLabel>イベント名</FormLabel>
                        <Input type="text" placeholder="例: ○○講習会" value={eventName} onChange={e => setEventName(e.target.value)} />
                    </FormControl>
                    <FieldSet caption="作成者 氏名" helperText="複数人で作成した場合は、代表者の氏名を入力してください。">
                        <FormControl isRequired>
                            <FormLabel>姓</FormLabel>
                            <Input type="text" value={familyName} onChange={e => setFamilyName(e.target.value)} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>名</FormLabel>
                            <Input type="text" value={givenName} onChange={e => setGivenName(e.target.value)} />
                            <FormHelperText>複数人で作成した場合は、代表者一名について記入してください。</FormHelperText>
                        </FormControl>
                    </FieldSet>
                    <FieldSet caption="参加年月日" helperText="イベントに参加した年月日を入力してください。">
                        <FormControl isRequired>
                            <FormLabel>年</FormLabel>
                            <Select>

                            </Select>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>月</FormLabel>
                            <Select>

                            </Select>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>日</FormLabel>
                            <Select>

                            </Select>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>イベントの内容</FormLabel>
                            <Textarea value={eventContent} onChange={e => setEventContent(e.target.value)} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>イベントに参加した感想</FormLabel>
                            <Textarea />
                        </FormControl>

                    </FieldSet>
                    <Button type="submit" colorScheme="blue">PDFを作成</Button>
                </VStack>
            </chakra.form>
        </VStack>
    )
}