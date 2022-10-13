import React from 'react'
import AddIcon from '../Img/Add_icon.png'
import style from './ButtonAddItamTakeProfit.module.scss'

const ButtonAddItamTakeProfit = (props: any) => {

    return (
        <div className={style.buttonBlock}>
            <img src={AddIcon} />
            <p>Add profit target {props?.length} / 5</p>
        </div>
    )
}

export { ButtonAddItamTakeProfit }