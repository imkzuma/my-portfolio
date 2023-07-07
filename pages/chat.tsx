import ChatLayout from "@/layouts/ChatLayout";
import { ChatbotApi } from "@/utils/api";
import { Avatar, Box, Button, Flex, Icon, Input, InputGroup, InputRightElement, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { TypeAnimation } from 'react-type-animation';

const MyChat = ({ chat }: any) => {
  return (
    <Stack
      w={'full'} align={'center'}
      bg={useColorModeValue('gray.100', 'gray.800')}
    >
      <Stack
        w={{ base: 'full', lg: '50%' }}
        maxW={{ base: 'full', lg: '50%' }}
        py={5} px={{ base: 5, md: 0 }}
      >
        <Flex align={'top'} gap={5}>
          <Avatar name={"depon"} />
          <Text pt={3}>{chat}</Text>
        </Flex>
      </Stack>
    </Stack>
  )
}

const ResponseChat = ({ response, setLoadAnswer }: any) => {
  return (
    <Stack
      py={5} px={{ base: 5, md: 0 }}
      w={'full'}
      maxW={{ base: 'full', lg: '50%' }}
    >
      <Flex align={'top'} gap={5}>
        <Avatar name={"Chatbot"} />
        <Text pt={3}>
          <TypeAnimation
            cursor={false}
            sequence={[response, () => { setLoadAnswer(false) }]}
            speed={70}
          />
        </Text>
      </Flex>
    </Stack>
  )
}


export default function ChatBot() {
  const [msg, setMsg] = useState<string>('');
  const [saveMsg, setSaveMsg] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAnswer, setLoadingAnswer] = useState<boolean>(false);

  const handleChangeMsg = (e: any) => {
    setMsg(e.target.value);
  }

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter' && msg !== '') {
      handleSendMsg(e);
    }
  }

  const handleSendMsg = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      setLoadingAnswer(true);

      const response = await ChatbotApi.post("/chatbot", {
        chat: msg
      });
      const { data } = response as any;

      setSaveMsg((prevSaveMsg: any) => ([
        ...prevSaveMsg,
        {
          mine: msg,
          response: data.response
        }
      ]));
      // localStorage.setItem('history-chat', JSON.stringify({ name: saveMsg[0].mine, saveMsg }));

      setMsg('');

    } catch (error) {
      setSaveMsg((prevSaveMsg: any) => ([
        ...prevSaveMsg,
        {
          mine: msg,
          response: "Network Error."
        }
      ]));

    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Portfolio | Chatbot</title>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
      <ChatLayout>
        <Stack align={'center'}>
          <Box
            w={'full'}
            minH={"87vh"}
            maxH={'87vh'}
            bg={useColorModeValue('gray.200', 'gray.700')} overflowY={'auto'}
          >
            {saveMsg.map((item: any, index: number) => {
              return (
                <Stack align={'center'} w={'full'} key={index}>
                  <MyChat chat={item.mine} />
                  <ResponseChat response={item.response} setLoadAnswer={setLoadingAnswer} />
                </Stack>
              )
            })}
          </Box>
          <Box
            maxH={'10vh'}
            w={{ base: '93%', md: '50%' }}
            pt={{ base: '1vh', md: '3vh' }}
            pos={'relative'}
          >
            <InputGroup size={'lg'}>
              <Input
                type="text"
                value={msg as string}
                placeholder="Send a Message"
                onChange={handleChangeMsg}
                onKeyUp={handleKeyPress}
                py={7}
                required
              />
              <InputRightElement width='4.5rem' pt={2}>
                <Button
                  h='1.75rem' size='sm'
                  onClick={handleSendMsg}
                  isLoading={loading || loadingAnswer}
                  isDisabled={msg === ''}
                  colorScheme="blue"
                >
                  <Icon as={BsSend} />
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
        </Stack>
      </ChatLayout>
    </>
  )
}