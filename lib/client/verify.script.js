"use strict";
let searchParams = new Map();
let searchParamsList = window.location.hash.substring(1).split("&");
searchParamsList.forEach(value => {
    if (value.search("=") > -1) {
        let valueList = value.split("=");
        searchParams.set(String(valueList.at(0)), String(valueList.at(1)));
    }
});
if (searchParams.has("access_token")) {
    fetch(`${window.location.origin}/api/auth/verify/${searchParams.get("access_token")}`, {
        method: "POST",
        headers: {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)"
        }
    }).then(function (response) {
        return response.json();
    }).then(function () {
        window.location.href = "/";
    }).catch(() => {
        // verification error
    });
}
else if (searchParams.has("error_code")) {
    // verification error
}
