import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

export default function Question(props) {
  const [question, setQuestion] = useState(props.question);

  const [text, setText] = useState("");
  const [opt_answer, setOpt_answer] = useState("");

  const updateText = (e) => {
    setText(e.target.value);
    props.handler(props.id, text);
  };

  const updateOption = (e) => {
    props.handler(props.id, e.target.value);
  };

  const [checkboxes, setCheckboxes] = useState([]);
  const updateCheckBox = (e) => {
    if (e.target.checked) {
      props.handler(props.id, [...checkboxes, e.target.value])
    } else {
      setCheckboxes(checkboxes=>checkboxes.filter((item) => item !== e.target.value));
      props.handler(checkboxes.filter((item)=> item !== e.target.value))
    }
    props.handler(props.id, checkboxes);
  };
  const options = question.options.map((option) => {
    const [checked, setChecked] = useState(false);

    if (question.type === "checkbox") {
      return (
        <FormControlLabel
          value={option}
          control={
            <Checkbox
              value={option}
              checked={checked}
              onChange={(e) => {
                setChecked(e.target.checked);
                updateCheckBox(e);
              }}
              color="primary"
            />
          }
          label={option}
        />
      );
    } else if (question.type === "radio") {
      return (
        <FormControlLabel
          value={option}
          control={<Radio color="primary" />}
          label={option}
        />
      );
    }
  });
  return (
    <div className="p-4 bg-white rounded-lg">
      <div className="name">
        <h2 className="py-3">{question.name}</h2>
        {question.type === "text" && (
          <TextField
            value={text}
            onChange={(e) => {
              props.handler(props.id, e.target.value);
              setText(e.target.value);
            }}
            className="w-full z-0 bg-white mt-3"
            color="primary"
            variant="filled"
            size="small"
            label="Add yout response"
          />
        )}
      </div>
      {question.options.length > 0 && (
        <div className="options pt-3">
          <div className="px-2">
            {question.type === "radio" ? (
              <RadioGroup onChange={(e) => updateOption(e)}>
                {options}
              </RadioGroup>
            ) : (
              <FormGroup>{options}</FormGroup>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
