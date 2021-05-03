import React, { useState } from "react";

import "../styles/App.css";

import Frame from "./Frame";
import Button from "./Button";
import Input from "./Input";
import Skill from "./Skill";

function App() {
  let [state, setState] = useState({
    charName: "Авантюрист", //имя персонажа
    strength: 1, // сила
    dexterity: 1, // ловкость
    intelligence: 1, // интеллект
    charisma: 1, // харизма
    vitality: 4, // жизненная сила максимум
    currentVitality: 4, // жизненная сила текущая
    evasion: 11, // уклонение
    energy: 2, // энергия
    skills: {
      // скилы
      attack: 0, // атака
      steals: 0, // скрытность
      archery: 0, // стрельба из лука
      learnability: 0, // обучаемость
      survival: 0, // выживание
      medicine: 0, // медицина
      intimidation: 0, // запугивание
      discernment: 0, // пронициательность
      appearance: 0, // внешний вид
      manipulation: 0, // манипулирование
    },
  });

  function updateStateFromFile(newState) {
    setState(() => ({
      ...newState,
    }));
  }

  function changeNameHandler(value) {
    setState((state) => ({
      ...state,
      charName: value,
    }));
  }

  function changeStrengthHandler(value) {
    setState((state) => ({
      ...state,
      strength: parseInt(value),
    }));

    setState((state) => ({
      ...state,
      vitality: state.strength + 3,
      currentVitality: state.strength + 3,
    }));
  }

  function changeDexterityHandler(value) {
    setState((state) => ({
      ...state,
      dexterity: parseInt(value),
    }));

    setState((state) => ({
      ...state,
      evasion: state.dexterity + 10,
      energy: state.dexterity + state.intelligence,
    }));
  }

  function changeIntelligenceHandler(value) {
    setState((state) => ({
      ...state,
      intelligence: parseInt(value),
    }));
    setState((state) => ({
      ...state,
      energy: state.dexterity + state.intelligence,
    }));
  }

  function changeCharismaHandler(value) {
    setState((state) => ({
      ...state,
      charisma: parseInt(value),
    }));
  }

  function changeSkillHandler({ name, level }) {
    setState((state) => ({
      ...state,
      skills: {
        ...state.skills,
        [name]: level,
      },
    }));
    // setState((state) => ({
    //   ...state,
    //   state.skills:{
    //   ...state.skills,
    //   name: level,
    // }));
  }

  function slapHandler() {
    setState((state) => ({
      ...state,
      currentVitality: state.currentVitality - 1,
    }));

    // TODO: Хак. Выяснить, почему в форме 0, а тут 1
    // предположительно что то опаздывает
    if (state.currentVitality <= 1) {
      alert("Your char is dead.");
    }
  }

  function exportStateToFile() {
    function download(filename, text) {
      let element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }

    download("state.json", JSON.stringify(state));
  }

  function importStateFromFile() {
    function onChooseFile(e) {
      let fr = new FileReader();
      fr.readAsText(e.target.files[0]);
      fr.onloadend = function (e) {
        // TODO: валидация нужна, но не в тестовом
        const newState = JSON.parse(e.target.result);
        updateStateFromFile(newState);
      };
    }

    let element = document.createElement("input");
    element.setAttribute("type", "file");
    element.onchange = onChooseFile;
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  return (
    <div className="App">
      <Frame>
        <div className="App-Controls">
          <Button title="Ударить" onClickHandler={slapHandler} />
          <Button title="Экспорт" onClickHandler={exportStateToFile} />
          <Button title="Импорт" onClickHandler={importStateFromFile} />
        </div>
      </Frame>

      <Frame>
        <Input
          label="Имя персонажа:"
          value={state.charName}
          onChangeHandler={(value) => changeNameHandler(value)}
        />

        <div className="App-Stats">
          <Input
            label="Жизненная сила:"
            size={2}
            isDisabled={true}
            value={`${state.currentVitality}/${state.vitality}`}
          />
          <Input
            label="Уклонение:"
            size={2}
            isDisabled={true}
            value={state.evasion}
          />
          <Input
            label="Энергичность:"
            size={2}
            isDisabled={true}
            value={state.energy}
          />
        </div>

        <div className="App-BaseParams">
          <Input
            label="Сила:"
            type="number"
            size={4}
            value={state.strength}
            onChangeHandler={(value) => changeStrengthHandler(value)}
          />
          <Input
            label="Ловкость:"
            type="number"
            size={4}
            value={state.dexterity}
            onChangeHandler={(value) => changeDexterityHandler(value)}
          />
          <Input
            label="Интеллект:"
            type="number"
            size={4}
            value={state.intelligence}
            onChangeHandler={(value) => changeIntelligenceHandler(value)}
          />
          <Input
            label="Харизма:"
            type="number"
            size={4}
            value={state.charisma}
            onChangeHandler={(value) => changeCharismaHandler(value)}
          />
        </div>
      </Frame>

      <Frame title="Скилы:">
        <div className="App-Skills">
          <Skill
            name="attack"
            label="Атака"
            baseStat={state.strength}
            value={state.skills.attack}
            onChangeHandler={changeSkillHandler}
          />
          <Skill
            name="steals"
            label="Скрытность"
            baseStat={state.dexterity}
            value={state.skills.steals}
            onChangeHandler={changeSkillHandler}
          />
          <Skill
            name="archery"
            label="Стрельба из лука"
            baseStat={state.dexterity}
            value={state.skills.archery}
            onChangeHandler={changeSkillHandler}
          />
          <Skill
            name="learnability"
            label="Обучаемость"
            baseStat={state.intelligence}
            value={state.skills.learnability}
            onChangeHandler={changeSkillHandler}
          />
          <Skill
            name="survival"
            label="Выживание"
            baseStat={state.intelligence}
            value={state.skills.survival}
            onChangeHandler={changeSkillHandler}
          />
          <Skill
            name="medicine"
            label="Медицина"
            baseStat={state.intelligence}
            value={state.skills.medicine}
            onChangeHandler={changeSkillHandler}
          />
          <Skill
            name="intimidation"
            label="Запугивание"
            baseStat={state.charisma}
            value={state.skills.intimidation}
            onChangeHandler={changeSkillHandler}
          />
          <Skill
            name="discernment"
            label="Пронициательность"
            baseStat={state.charisma}
            value={state.skills.discernment}
            onChangeHandler={changeSkillHandler}
          />
          <Skill
            name="appearance"
            label="Внешний вид"
            baseStat={state.charisma}
            value={state.skills.appearance}
            onChangeHandler={changeSkillHandler}
          />
          <Skill
            name="manipulation"
            label="Манипулирование"
            baseStat={state.charisma}
            value={state.skills.manipulation}
            onChangeHandler={changeSkillHandler}
          />
        </div>
      </Frame>
    </div>
  );
}

export default App;
