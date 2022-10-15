import React from 'react'
import Select from 'react-select'
import chroma from 'chroma-js';

const InputSeletList = ({menuKey, menu, propsData, setMenuList}) => {
  const options  = [];
  propsData.menuList.forEach((list)=> {
    const option =  { value : list.id, label: list.name, color: list.color};
    options.push(option)
  })
  const default_options = [];
  menu.menu_list.forEach((list) => {
    const default_option = { value : list.list_id, label: list.list_name, color: list.list_color};
    default_options.push(default_option);
  })
  
  const colourStyles = {
    option:  (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default', ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ':hover': {
        backgroundColor: data.color,
        color: 'white',
      },
    }),
  }
  const handleChange = (newList) => {
    const newData = [];
    newList.forEach((list)=> { newData.push(list.value) }) 
    setMenuList(newData);
  }
  return (
    <Select 
      isMulti 
      options={options} 
      closeMenuOnSelect={false}
      styles={colourStyles}
      onChange={handleChange}
      defaultValue = {default_options}
    />
  )
}

export default InputSeletList