/* eslint-disable react/prop-types */

const UrlStatus = (props) => {
    const { urlStatus } = props;

    if (urlStatus === "active") {
        return (
            <>
                <span className="text-active-link">Active</span>
            </>
        )
    } else if (urlStatus === "inactive") {
        return (
            <>
                <span className="text-inactive-link">Inactive</span>
            </>
        )
    } else if (urlStatus === "expired") {
        return (
            <>
                <span className="text-expired-link">Expired</span>
            </>
        )
    } else {
        return null;
    }
}

export default UrlStatus