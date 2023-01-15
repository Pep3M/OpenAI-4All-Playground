import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import LanguageDetect from 'languagedetect';

const BlockCode = ({code}) => {
  const lngDetector = new LanguageDetect();
  const language = lngDetector.detect(code, 1);
  
    return (
      <SyntaxHighlighter language={language} style={atomOneDark}>
        {code}
      </SyntaxHighlighter>
    );
}

export default BlockCode;
