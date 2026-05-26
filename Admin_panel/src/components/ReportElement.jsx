import "../App.css"

function ReportElement({
        ittr,
        count,
}) {



        return (
                <>
                        <div className="flex flex-row uppercase   ">
                                <div className="flex-1 border-2 p-2 ">{count}</div>
                                <div className="flex-2 border-2 p-2 ">{ittr.shippingdetail.name}</div>
                                <div className="flex-2 border-2 p-2">{ittr.shippingdetail.address} {ittr.shippingdetail.city} {ittr.shippingdetail.state} {ittr.shippingdetail.zip }</div>
                                <div className="flex-2 border-2 p-2">{ittr.ordered}</div>

                        </div>
                </>
        )
}

export default ReportElement
