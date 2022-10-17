import React from "react"
import { QUOTE_CURRENCY, PERCENTAGE_SYMBOL } from "PlaceOrder/constants";
import styles from './InputForTakeProfit.module.scss'
import { InputAdornment, FilledInput,FormHelperText} from "@material-ui/core";
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
import { useFormik } from "formik";

const InputForTakeProfit = observer((data: TakeProfitType, { onSubmit }) => {
    const {
        id,
        profit,
        targetePrise,
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
        formik.values.profit = event.target.value;
        formik.handleChange(event)
        getRelevantSumm()
    }

    const changeTargetPrice = (event: any) => {
        addNewTargetPriceValue(id, event.target.value)
        formik.values.targetePrise = event.target.value;
        formik.handleChange(event)
        getRelevantSumm()
    }
    const changeAmoundToBuy = (event: any) => {
        addamoundToByeValue(id, event.target.value)
        formik.values.amoundToBye = event.target.value
        formik.handleChange(event)
        getRelevantSumm()
    }

    const getRelevantSumm = () => {
        AllSummValueProfit()
        AllSummValueAmount()
    }

    const formik = useFormik({
        initialValues: {
            profit: profit,
            targetePrise: targetePrise,
            amoundToBye: amoundToBye,
        },
        onSubmit: (values) => {
            console.log(JSON.stringify(values));
        },

        validate: values => {
            let errors: any = {}
            if (values.profit === 0.01) {
                errors.profit = 'Minimum value is 0.01'
            } else if (allSummValueProfit > 500) {
                errors.profit = 'Maximum profit sum is 500%'
            } else if (values.targetePrise === 0) {
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
            <form  id='formInput' className={styles.formRotation} onSubmit={formik.handleSubmit}>
                <div className={styles.ProfitBlock}>
                    <span style={FotmHelperTextStyle}>
                        Profit
                    </span>
                    {formik.touched.profit && formik.errors.profit 
                      ?  <FormHelperText className={styles.errorBlock} id="component-error-text">{formik.errors.profit}</FormHelperText> 
                      : null}
                    <FilledInput
                        value={profit}
                        style={ProfitFilledInputsStyle}
                        onChange={(event) => {changeProfit(event) }}
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
                    {formik.touched.targetePrise && formik.errors.targetePrise 
                       ? <FormHelperText className={styles.errorBlock} id="component-error-text">{formik.errors.targetePrise}</FormHelperText>
                       : null}
                    <FilledInput
                        value={targetePrise}
                        name={'targetePrise'}
                        style={TargetPriceFilledInputsStyle}
                        onChange={(event) => { changeTargetPrice(event) }}
                        endAdornment={
                            <InputAdornment position="end">
                                <span style={SpanStyle}>{QUOTE_CURRENCY}</span>
                            </InputAdornment>}
                        error={Boolean(formik.errors.targetePrise)}
                        inputProps={{ style: InputPropsStyle }}
                    />
                </div>
                <div className={styles.AmountToBuyBlock}>
                    {formik.touched.amoundToBye && formik.errors.amoundToBye 
                        ? <FormHelperText className={styles.errorBlock} id="component-error-text">{formik.errors.amoundToBye}</FormHelperText> 
                        : null}
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
            </form>
        </div>
    )
}
)

export { InputForTakeProfit }

