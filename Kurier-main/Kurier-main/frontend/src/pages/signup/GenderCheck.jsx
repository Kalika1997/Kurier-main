import React from 'react'
const GenderCheckbox = ({ onGenderCheckBoxChange, selectedGender }) => {
  return (

    <div className='flex'>

      {/* Male */}
      <div className='form-control'>
        <label className={`label gap-2 cursor-pointer`}>
          <span className='label-text'>Male</span>
          <input type='checkbox' className='checkbox border-yellow-700'
            checked={selectedGender === 'male'}
            // onGenderCheckBoxChange is a callback function which needs a argument (male/female) which is then updated in state
            onChange={() => onGenderCheckBoxChange('male')}

          />
        </label>
      </div>

      {/* Female */}
      <div className='form-control'>
        <label className={`label gap-2 cursor-pointer`}>
          <span className='label-text'>Female</span>
          <input type='checkbox' className='checkbox border-yellow-400' 
            checked={selectedGender === 'female'}
            onChange={() => onGenderCheckBoxChange('female')}
          />
        </label>
      </div>
    </div>
  );
};
export default GenderCheckbox;