import React from "react"
import { QUOTE_CURRENCY, PERCENTAGE_SYMBOL } from "PlaceOrder/constants";
import styles from './InputForTakeProfit.module.scss'
import { InputAdornment, FilledInput} from "@material-ui/core";
import DeleteIcon from '../Img/Delete_icon.png'
import { TakeProfitType } from "PlaceOrder/model";
import {
    AmounToBuyFilledInputsStyle,
    FotmHelperTextStyle,
    InputPropsStyle,
    ProfitFilledInputsStyle,
    SpanStyle,
    TargetPriceFilledInputsStyle,
} from "./InputForTakeProfitObjectStyle";
import { observer } from "mobx-react-lite";
import { useStore } from "PlaceOrder/context";
import {useFormik} from "formik";

const InputForTakeProfit = observer((data: TakeProfitType, { onSubmit }) => {
    const {
        id,
        profit,
        targitePrise,
        amoundToBye,
    } = data;

    const {
        allSummValueProfit,
        allSummValueAmount,
        deleteTakeProfit,
        addNewProfitValue,
        AllSummValueAmount,
        AllSummValueProfit,
        addNewTargetPriceValue,
        addamoundToByeValue,
    } = useStore();


    const changeProfit = (event: any) => {
        addNewProfitValue(id, event.target.value);
        getRelevantSumm()
    }

    const changeTargetPrice = (event: any) => {
        addNewTargetPriceValue(id, event.target.value)
        getRelevantSumm()
    }
    const changeAmoundToBuy = (event: any) => {
        addamoundToByeValue(id, event.target.value)
        getRelevantSumm()
    }

    const getRelevantSumm = () => {
        AllSummValueProfit()
        AllSummValueAmount()
    }

    const formik = useFormik({
        initialValues: {
            profit: profit,
            targitePrise: targitePrise,
            amoundToBye: amoundToBye,
        },
        onSubmit: (values) => {
            console.log(JSON.stringify(values));
        },

        validate: values => {
            let toNumber = Number(values.profit)
            console.log(toNumber)
            let errors: any = {}
            if (values.profit === 0.01) {
                errors.profit = 'Minimum value is 0.01'
            } else if (allSummValueProfit > 500) {
                errors.profit = 'Maximum profit sum is 500%'
            } else if (values.targitePrise === 0) {
                errors.targitePrise = "Price must be greater than 0"
            } else if (allSummValueAmount > 100) {
                let ExcessNum = allSummValueAmount - 100
                errors.amoundToBye = `${allSummValueAmount}% out of 100% selected. Please decrease by ${ExcessNum}%`
            }
            return errors
        },
    })
    return (
        <div className={styles.InputBlock}>
            <form className={styles.formRotation} onSubmit={formik.handleSubmit}>
                <div className={styles.ProfitBlock}>
                    <span style={FotmHelperTextStyle}>
                        Profit
                    </span>
                    {formik.touched.profit && formik.errors.profit ? <p className={styles.errorBlock}>{formik.errors.profit}</p> : null}
                    <FilledInput
                        value={profit}
                        style={ProfitFilledInputsStyle}
                        onChange={(event) => { changeProfit(event) }}
                        endAdornment={
                            <InputAdornment position="end">
                                <span style={SpanStyle}>{PERCENTAGE_SYMBOL}</span>
                            </InputAdornment>}
                        aria-describedby="filled-weight-helper-text"
                        error={Boolean(formik.errors.profit)}
                        inputProps={{ style: InputPropsStyle }}
                    />
                </div>
                <div className={styles.TargetPriceBlock}>
                    <span style={FotmHelperTextStyle}>
                        Target price
                    </span>
                    {formik.touched.targitePrise && formik.errors.targitePrise ? <p className={styles.errorBlock}>{formik.errors.targitePrise}</p> : null}
                    <FilledInput
                        value={targitePrise}
                        name={'targitePrise'}
                        error={Boolean(formik.errors.targitePrise)}
                        style={TargetPriceFilledInputsStyle}
                        onChange={(event) => { changeTargetPrice(event) }}
                        endAdornment={
                            <InputAdornment position="end">
                                <span style={SpanStyle}>{QUOTE_CURRENCY}</span>
                            </InputAdornment>}
                        inputProps={{ style: InputPropsStyle }}
                    />
                </div>
                <div className={styles.AmountToBuyBlock}>
                    {formik.touched.amoundToBye && formik.errors.amoundToBye ? <p className={styles.errorBlock}>{formik.errors.amoundToBye}</p> : null}
                    <span style={FotmHelperTextStyle}>
                        Amount to buy
                    </span>
                    <FilledInput
                        value={amoundToBye}
                        name={'amoundToBye'}
                        style={AmounToBuyFilledInputsStyle}
                        error={Boolean(formik.errors.amoundToBye)}
                        onChange={(event) => { changeAmoundToBuy(event) }}
                        endAdornment={<InputAdornment position="end">
                            <span style={SpanStyle}>{PERCENTAGE_SYMBOL}
                                <img onClick={() => { deleteTakeProfit(id) }}
                                    className={styles.deleteButtonStyle}
                                    src={DeleteIcon} />
                            </span>
                        </InputAdornment>}
                        aria-describedby="filled-weight-helper-text"
                        inputProps={{ style: InputPropsStyle }}
                    />
                </div>
                <button className={styles.buttonCheckForm} type="submit"> Check form </button>
            </form>
        </div>
    )
}
)

export { InputForTakeProfit }

