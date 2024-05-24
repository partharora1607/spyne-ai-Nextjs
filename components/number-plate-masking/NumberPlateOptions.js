// components/RadioGroup.js
import React from 'react';

const RadioGroup = ({ options, selectedValue, onChange, DiabledButtons, SettingsSection }) => {
  return (
    <div>
      {options.map((option) => (
        <label>
            <input
            type="radio"
            value={option.value}
            checked
            onChange={onChange}
            className="hidden"
            disabled={DiabledButtons}
            name="UserLogoUrl"
            id={option.id}
            />
            <div class="upscaler-factor-block block overflow-hidden mb-5 bg-white border border-white rounded-xl shadow-[0_0px_16px_0px_rgba(64,35,135,0.08)] hover:border-500 hover:border-1 hover:border-[#CCCCCC]">
                <div className="grid grid-cols-12">
                    <div className='col-span-12'>
                        <img className={SettingsSection} src={option.value} loading="lazy"></img>  
                    </div> 
                </div>
            </div>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
