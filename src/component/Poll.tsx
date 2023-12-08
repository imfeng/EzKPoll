
import 'react-leaf-polls/dist/index.css'
import { Theme } from './types/theme'
import { Result } from './types/result'
import { MultiplePoll } from './MultiplePoll/MultiplePoll'
import { useState } from 'react';

const Poll = () => {
  const [isVoted, setIsVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const resData = [
    { id: 0, text: 'vitalik.eth', votes: 6 },
    { id: 1, text: 'machibigbrother.eth', votes: 2 },
    { id: 2, text: 'binance.eth', votes: 1 }
  ]
  
  // Object keys may vary on the poll type (see the 'Theme options' table below)
  const customTheme: Theme = {
    textColor: 'whitesmoke',
    mainColor: '#00B87B',
    backgroundColor: 'rgba(200,200,200, .5)',
    alignment: 'center',
    textAnswerColor: 'rgba(233,233,233)',
  }
  
  async function vote(item: Result, results: Result[]) {
    // Here you probably want to manage
    // and return the modified data to the server.
    setIsLoading(true);
    await delay(7000);
    setIsVoted(true);
    setIsLoading(false);

    // setIsVoted(true);
  }

  return (
    <div className="poll-box max-w-3xl">
      {/* <div className="poll-w">

      </div> */}
      <MultiplePoll
        question='Who will be the most richest people in 2024 ?'
        results={resData}
        theme={customTheme}
        onVote={vote}
        isVoted={isVoted}
      />
    
    </div>
  )
}

async function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

export default Poll;

