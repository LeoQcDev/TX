import React, { createContext, useContext, useRef } from "react";

const FormContext = createContext({});

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [triggerSubmit, setTriggerSubmit] = React.useState();

  return (
    <FormContext.Provider value={{ triggerSubmit, setTriggerSubmit }}>
      {children}
    </FormContext.Provider>
  );
};
