
import React, { useEffect, useState } from "react";
import styles from "./TakeProfit.module.scss";
import { Switch } from "components";
import { toJS } from 'mobx';

import QuestionIcon from '../../../../src/components/Img/Question_icon.png'
import { InputForTakeProfit } from "components/InputForTakeProfit/InputForTakeProfit";
import { TakeProfitType } from "PlaceOrder/model";
import { useStore } from "PlaceOrder/context";
import { observer } from "mobx-react";
import { ButtonAddItamTakeProfit } from "components/ButtonAddItemTakeProfit/ButtonAddItamTakeProfit";


const TakeProfit = observer((props:any,{onSubmit}) => {
  const {
    takeProfitArray,
    resultSumm,
    addTakeProfit,
    deleteTakeProfit,
    addOneTakeProfit,
    resetResultSumm,
  } = useStore();

  const {
    isSubmit,
  } =props
  
  let defaultTakeProfitArray = toJS(takeProfitArray)
  let length = defaultTakeProfitArray.length

  const AddItemTakeProfit = () => {
    let endId = defaultTakeProfitArray.slice(-1)[0].id
    let oldProfit = defaultTakeProfitArray.slice(-1)[0].profit
    addTakeProfit(endId, oldProfit)
  }

  const [isToggle, setToggle] = useState(false)

  useEffect(() => {
    if (isToggle) {
      addOneTakeProfit(0, 0)
    } else {
      resetResultSumm()

    }
  }, [isToggle])

  return (
    <div className={styles.block}>
      <div className={styles.header}>
        <div className={styles.takeProfitTittleBlock}>
          <span className={styles.title}>Take Profit</span>
          <img className={styles.questionIcon} src={QuestionIcon} />
        </div>
        <Switch onChange={() => { setToggle(!isToggle) }} checked={isToggle} />
      </div>
      {isToggle
        ? defaultTakeProfitArray ? defaultTakeProfitArray.map((item: TakeProfitType) => {
          return <InputForTakeProfit key={item.id} {...item} isSubmit={isSubmit} onSubmit={onSubmit} deleteTakeProfit={deleteTakeProfit} />
      }): null
        : <></>
      }
      {isToggle && length < 5
        ? <div onClick={() => { AddItemTakeProfit() }}>
            <ButtonAddItamTakeProfit length={length} />
          </div>
        : null
      }
      <div className={styles.projectProfit}>
        <span className={styles.spanProjectProfit}>Projected profit</span>
        <div>
          <span className={styles.resulNumber}>{resultSumm === 0 ? 0 : resultSumm}</span>
          <span className={styles.spanProjectProfit}>USDT</span>
        </div>
      </div>
    </div>
  )
});

export {TakeProfit}