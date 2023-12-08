
import 'react-leaf-polls/dist/index.css'
import { Theme } from './types/theme'
import { Result } from './types/result'
import { MultiplePoll } from './MultiplePoll/MultiplePoll'

const Poll = () => {
  const resData = [
    { id: 0, text: 'Answer 1', votes: 0 },
    { id: 1, text: 'Answer 2', votes: 0 },
    { id: 2, text: 'Answer 3', votes: 0 }
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
  }

  return (
    <div className="poll-box max-w-3xl">
      <MultiplePoll
        question='What is your favorite team?'
        results={resData}
        theme={customTheme}
        onVote={vote}
        isVoted={false}
      />

    </div>
  )
}

export default Poll;