import { useState } from "react";
import { FeedbackOptions } from "./FeedBackBtn/FeedbackOptions";
import { Notification } from "./Notification/Notification";
import { Section } from "./Sections/Section";
import { FeedBackStat } from "./Statistics/FeedBackStat";

export const App = () => {
  const [feedbackState, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  })
  
  const onBtnClick = stateName => {
    setFeedback((prevState) => ({
      ...prevState,
      [stateName]: prevState[stateName] + 1,
    }))
  }

  const countTotalFeedback = () => {
    return feedbackState.bad + feedbackState.neutral + feedbackState.good;
  }

  const countPositiveFeedbackPercentage = () => {
    return (feedbackState.good / countTotalFeedback() * 100).toFixed(0);
  }
  
  const options = Object.keys(feedbackState);
  return <>
    <Section title="Please leave feedback">
      <FeedbackOptions
        options={options}
        onLeaveFeedback={onBtnClick} />
    </Section>

    <Section title="Statistics">
      {countTotalFeedback() === 0 ? <Notification message='No feedback given' /> : (
        <div>
          <FeedBackStat
            good={feedbackState.good}
            neutral={feedbackState.neutral}
            bad={feedbackState.bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}/>
        </div>)}
    </Section>
  </>
}