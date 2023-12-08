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
        className={`btn-box flex flex-wrap justify-center align-center ${styles.answer}`}>
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
            onClickVote(result)
            console.log('info clicked')
          setIsLoading(true);
          await delay(7000);
          setIsLoading(false);
      
          if (!voted) {
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
    </article>
  )
}


async function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
