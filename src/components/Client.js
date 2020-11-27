import React, { Component } from 'react'



// ################Main Component##################
class Client extends Component {
    constructor(props) {
        super(props)
        this.renderTableHeading = this.renderTableHeading.bind(this)
        this.renderTableBody = this.renderTableBody.bind(this)
    }

    // Dynamic header generation function based upon client data for table.
    renderTableHeading = () => {
        console.log("props datta", this.props.client_data)
        return (
            Object.keys(this.props.client_data[0]).map((people, index) =>

                <th key={people}>

                    {people.toUpperCase()}
                </th>

            )

        )
    }

    // Function to generate template code based upon client data for table.
    renderTableBody = () => {
     
        return this.props.client_data.map((attr, id) =>
            <tr key={id}>
                <td>{attr.client} </td>
                <td>{attr.matter} </td>
                <td>{attr.description} </td>
                <td>{attr.type} </td>
                <td>{attr.time} </td>

            </tr>)

    }
    render() {
        return (
            <div>

                <table className="table">
                    <thead>
                        <tr>
                            {this.renderTableHeading()}
                        </tr>
                    </thead>
                    <tbody>

                        {this.renderTableBody()}


                    </tbody>
                </table>
            </div>
        )
    }
}
export default Client