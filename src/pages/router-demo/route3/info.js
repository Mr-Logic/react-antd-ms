import React from 'react'

export default class Info extends React.Component {
    render () {
        return (
            <div>
                This is dynamic test page
                <hr/>
                {this.props.match.params.mainId}
            </div>
        )
    }
}