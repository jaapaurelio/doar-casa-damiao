function callDonationApi(body) {
    return fetch(`${process.env.NEXT_PUBLIC_HOME_URL}/api/donation/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then((response) => response.json());
}

export { callDonationApi };
