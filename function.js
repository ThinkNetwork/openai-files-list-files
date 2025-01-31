window.function = async function(api_key, limit, order, after, before, purpose) {
    // Validate API Key
    if (!api_key.value) {
        return "Error: OpenAI API Key is required.";
    }

    // Construct query parameters
    const queryParams = new URLSearchParams();
    if (limit.value) queryParams.append("limit", limit.value);
    if (order.value) queryParams.append("order", order.value);
    if (after.value) queryParams.append("after", after.value);
    if (before.value) queryParams.append("before", before.value);
    if (purpose.value) queryParams.append("purpose", purpose.value);

    // API endpoint URL
    const apiUrl = `https://api.openai.com/v1/files?${queryParams.toString()}`;

    // Make API request
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${api_key.value}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            return `Error ${response.status}: ${errorData.error?.message || "Unknown error"}`;
        }

        // Parse and return the response (list of files)
        const responseData = await response.json();
        return JSON.stringify(responseData, null, 2);

    } catch (error) {
        return `Error: Request failed - ${error.message}`;
    }
};
