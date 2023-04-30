import { AddIcon } from '@chakra-ui/icons'
import { Input, InputGroup, InputRightElement, IconButton, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react'
import React, { useState } from 'react'
// import { TimeInput } from './TimeInput';

export const AddInput = ({ callBack, placeholder }) => {
  const [inputValue, setInputValue] = useState('')
  const [numberValue, setNumberValue] = useState(0)

  const handleInputChange = (event) => {
    const value = event?.target?.value
    setInputValue(event.target.value)
  }

  const submitOnEnter = (e) => {
    if (e.key === 'Enter') {
      addButtonOnClick()
    }

  }
  const addButtonOnClick = () => {
    setInputValue('');
    setNumberValue(0);
    callBack(inputValue, `${numberValue}`)
  }
  return (
    <InputGroup size='sm' >

      <Input
        // pr='4.5rem'
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        color={'blackAlpha.900'}
        backgroundColor="whiteAlpha.700"
      />
      {/* <TimeInput setMinuteValue={setNumberValue}/> */}

      <InputRightElement width='3.5rem'>
        <AddIcon boxSize={4} onClick={addButtonOnClick} cursor="pointer" color={'brand.500'} />
      </InputRightElement>
    </InputGroup>)
}

