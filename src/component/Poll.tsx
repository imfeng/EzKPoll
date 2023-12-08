
import 'react-leaf-polls/dist/index.css'
import { Theme } from './types/theme'
import { Result } from './types/result'
import { MultiplePoll } from './MultiplePoll/MultiplePoll'
import { useState } from 'react';

const Poll = () => {
  const [isVoted, setIsVoted] = useState(false);
  
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
  
  function vote(item: Result, results: Result[]) {
    // Here you probably want to manage
    // and return the modified data to the server.
    setIsVoted(true);
  }

  return (
    <div className="poll-box max-w-3xl">
      
      <MultiplePoll
        question='Who will be the most richest people in 2024 ?'
        results={resData}
        theme={customTheme}
        onVote={vote}
        isVoted={false}
      />
      {
        isVoted ? (
          <>
          <h3>Raw data: </h3>
          <pre>
            {JSON.stringify({
              feedback:  "0x48656c6c6f20576f726c64000000000000000000000000000000000000000000",
              merkleTreeRoot: "6021330630486110644315170447257362299323044077734478685258377575510022074771",
              nullifierHash: "1417975019279511062820830953620223780980941164824451733661118607985211890239",
              proof: [
                '20979068446941769467691690232439486157703593346991803215449669776468857288354',
                '15192359095132740601324793178812160482806534815813876075854081040446777016987',
                '1716420531608092426771016579986132502161962344882274763334154767082868563117',
                '14624255951429454460386325386224173015941008950050831165889778404704044430847',
                '6881331980410915727929021702657943143106658111202784604060835174700266853712',
                '15198193589261677490995138473172305675603088038069527869451815997393976380731',
                '15939492300868500093234976916642927708781045472662281091821560509165090428375',
                '21640521068009539276751039986237348795672857437894754619640351250415727548499'
              ]
            }, null, 2)}
          </pre>
          </>
  
        ) :<></>
      }
    </div>
  )
}

export default Poll;
