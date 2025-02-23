import { useSelector } from 'react-redux'

import MultipleChoice from './answerFormat/MultipleChoice'
import InputFill from './answerFormat/InputFill'
import NumberChoice from './answerFormat/NumberChoice'
import MultipleImage from './answerFormat/MultipleImage'
import DefaultAnswerFormat from './answerFormat/DefaultAnswerFormat'

const CombineAnswerFormat = () => {
  const { question } = useSelector((state: any) => state.test)

  const renderMultipleChoice = () => <MultipleChoice />

  const renderInput = () => <InputFill />

  const renderNumber = () => <NumberChoice />

  const renderMultipleImage = () => <MultipleImage />

  const renderDefault = () => <DefaultAnswerFormat />

  const renderContent = () => {
    switch (question?.type) {
      case 'MULTIPLE':
        return renderMultipleChoice()
      case 'MULTIPLE_IMAGE':
        return renderMultipleImage()
      case 'INPUT':
        return renderInput()
      case 'NUMBER':
        return renderNumber()
      default:
        return renderDefault()
    }
  }

  return renderContent()
}

export default CombineAnswerFormat
