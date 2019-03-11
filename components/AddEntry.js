import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import {getMetricMetaInfo, timeToString} from "../utils/helpers";
import UdaciSlider from "./UdaciSlider";
import UdaciSteppers from "./UdaciSteppers";
import DateHeader from "./DateHeader";

export default class AddEntry extends Component {
    state = {
        run: 0,
        bike: -10,
        swim: 0,
        sleep: 0,
        eat: 0,
    };

    submit = () => {
        const key = timeToString();
        const entry = this.state;

        // Update Redux

        this.setState(() => ({ run: 0, bike: 0, swim: 0, sleep: 0, eat: 0 }))

        // Navigate to home

        // Save to "DB"

        // Clear local notification
    }

    increment = (metric) => {
        const {max, step} = getMetricMetaInfo(metric);

        this.setState((state) => {
            const count = state[metric] + step;

            return {
                ...state,
                [metric]: count > max ? max : count,
            }
        });
    };


    decrement = (metric) => {
        this.setState((state) => {
            const count = state[metric] - getMetricMetaInfo(metric).step;

            return {
                ...state,
                [metric]: count < 0 ? 0 : count,
        }
        })
    };

    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value
        }))
    };


    render(){
        const metaInfo = getMetricMetaInfo();
debugger;
        return (
             <View>
                 <DateHeader date={(new Date()).toLocaleDateString()}/>
                 <Text>{JSON.stringify(this.state)}</Text>
                {Object.keys(metaInfo).map((key) => {
                    const { getIcon, type, ...rest } = metaInfo[key];
                    const value = this.state[key];


                    return (
                        <View key={key}>
                            {getIcon()}
                            {type === 'slider'
                                ? <UdaciSlider
                                    value={value}
                                    onChange={(value) => this.slide(key, value)}
                                    {...rest}
                                />
                                : <UdaciSteppers
                                    value={value}
                                    onIncrement={() => this.increment(key)}
                                    onDecrement={() => this.decrement(key)}
                                    {...rest}
                                />}

                            <TouchableOpacity
                                onPress={this.submit}>
                                <Text>SUBMIT</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        )
    }
}