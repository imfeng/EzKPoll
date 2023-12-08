import React, { useState, useEffect, useRef, createRef, RefObject } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi';

import styles from './MultiplePoll.module.css'
import { manageVote, countPercentage, animateAnswers } from './utils'
//import { manageVote } from './utils'
import type { Result } from '../types/result'
import type { Theme } from '../types/theme'

export interface MultiplePollProps {
  question?: string
  results: Result[]
  theme?: Theme
  isVoted?: boolean
  isVotedId?: number
  onVote?(item: Result, results: Result[]): void
}

export const MultiplePoll = ({
  question,
  results,
  theme,
  onVote,
  isVoted,
  isVotedId,
}: MultiplePollProps) => {
  const { address } = useAccount();
  const [isShowInfoArr, setIsShowInfo] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [isLoading, setIsLoading] = useState(false);


  const [voted, setVoted] = useState<boolean>(false)
  const answerRefs = useRef<RefObject<HTMLDivElement>[]>(
    results.map(() => createRef<HTMLDivElement>())
  )

  useEffect(() => {
    if (isVoted) {
      countPercentage(results)
      animateAnswers(results, answerRefs, theme, undefined, isVotedId)
      setVoted(true)
    }
  }, [])

  const onClickVote = async (result: Result) => {
    
  }
  
  const onClickInfo = async (index: number) => {
    
    setIsShowInfo((prev) => {
      const newIsShowInfo = [...prev];
      newIsShowInfo[index] = !newIsShowInfo[index];
      return newIsShowInfo;
    });
  }

  return (
    <article
      className={styles.container}
      style={{ alignItems: theme?.alignment }}
    >
      {question && <h1 style={{ color: theme?.textColor }}>{question}</h1>}
      {
        isLoading ? (
          <p
          className='text-blue-500 text-center mt-4'
          >Please wait...</p>
        ) : <></>
      }

      {results.map((result, index) => (
        <>
        <div 
        key={'a-' +result.id}
        className={`btn-box flex flex-wrap justify-center align-center ${styles.answer} ${isLoading ? styles.hide : ''}`}>
        <div
          key={result.id}
          role='button'
          id={'mulAnswer' + result.id}
          className={
            voted ? styles.answer : styles.answer_hover + ' ' + styles.answer
            
          }
          style={{
            backgroundColor: theme?.backgroundColor
          }}
          onClick={async () => {
            // onClickVote(result)
            
      
          if (!voted) {
            console.log('info clicked')
          setIsLoading(true);
          await delay(7000);
          setIsLoading(false);

            setVoted(true)
            manageVote(results, result, answerRefs, theme)
            console.log({
              
            })
            onVote?.(result, results)
          }
          }}
        >
          <div
            ref={answerRefs.current[result.id]}
            className={styles.answerInner}
          >
            <p style={{ color: theme?.textAnswerColor }}>{result.text}</p>
          </div>
          {voted && (
            <span style={{ color: theme?.textColor }}>
              {result.votes}
            </span>
          )}
          
        </div>
        <a 
                key={'b-' +result.id}

        className={styles.info}
        onClick={() => onClickInfo(index)}
        >INFO {result.isShowInfo}</a>
        {
          isShowInfoArr[index] ? (
            <div className={styles.infoBox}>
          <h3>Key Points:</h3>
            <p>- The transfer was made from the address 0xED3F5cB09cC60fcCD96f545c4Cb45765Fe1CAd36.</p>
            <p>- The transfer was made to multiple addresses: 0x86bc952B086cA2277679a7C68199d19c15D602c2, 0x9ABc40c5be96b51b903C91752c73cCf4be4aA855, 0x57f89070186768adF90ca59215dAAD1525395Adf, 0x951180144834F299B71B854fa36C26E16817980C, 0x29CFED3f488395217A719e7719E663CaD4620bf9, and 0xB144DC2527a5d6666cfd590e31A496f6f1AC44e4.</p>
            <p>- The token being transferred is called ORDIBTC and its contract address is 0xE03c0a2BEC6ed861E6e83efAD38C7E5303e17315.</p>
            <p>- The value of each transfer is 63373100000000000 units of ORDIBTC.</p>
            <p>- The decimals of the ORDIBTC token are set to 8.</p>

          <h3>Insights:</h3>
            <p>- The address 0xE03c0a2BEC6ed861E6e83efAD38C7E5303e17315 is receiving multiple transfers of ORDIBTC tokens, which suggests that it may be a popular or important address in the Ethereum network.</p>
            <p>- The token ORDIBTC seems to have some value as it is being transferred in significant amounts.</p>
            <p>- The address 0xED3F5cB09cC60fcCD96f545c4Cb45765Fe1CAd36 is the owner of the tokens being transferred and is initiating the transfers to different addresses.</p>
            <p>- The transaction fees for these transfers are 0.00780421286066526 units of the underlying cryptocurrency.</p>
        </div>
          ): <></>
        }
        </div>
        </>
      ))}
      {
        isVoted ? (
          <>
          <div className="tx-box">
            <p>Tx Hash: <a 
            className='text-blue-500'
            target='_blank'
            href="https://zksync2-testnet.zkscan.io/tx/0x0e226e7566ae5567d3e32e4a75040a56bf324682107f9116f591f628986671fe/token-transfers">0x0e226e7566ae5567d3e32e4a75040a56bf324682107f9116f591f628986671fe</a></p>
          </div>
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
    </article>
  )
}


async function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
