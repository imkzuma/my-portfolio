import dynamic from "next/dynamic";
import { useState } from "react";
import { Box, Button, Stack } from "@chakra-ui/react";
import parse from 'html-react-parser';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import BoxContainer from "@/components/container";

export default function CreatePost() {
  const [body, setBody] = useState('');

  return (
    <BoxContainer>
      <ReactQuill
        theme="snow"
        value={body}
        onChange={(e) => setBody(e)}
      />
      <Stack spacing={0} className="parse-body">
        {parse(body)}
        {body}
      </Stack>
    </BoxContainer>
  )
}