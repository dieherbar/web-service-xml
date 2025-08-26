# Customer ID Verification API Documentation

## Overview
This is a test API that simulates the customer ID verification service for development and QA purposes. The API accepts customer ID information and returns creditor numbers that are automatically inserted into cashier application forms.

**Purpose**: Testing and development environment for customer ID verification
**Target Users**: Developers and QA team
**Protocol**: SOAP/XML
**Environment**: Test/Development only

## Endpoint Information
- **URL**: `https://web-service-xml.onrender.com/ws/soap`
- **Service Name**: Z_FI_WS_CONS_DEUD_ACR
- **Namespace**: `urn:sap-com:document:sap:rfc:functions`
- **Content-Type**: `text/xml; charset=utf-8`
- **SOAPAction**: (specify based on your implementation)

## Request Format

### SOAP Envelope Structure
```xml
<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
  <s:Header>
    <VsDebuggerCausalityData xmlns="http://schemas.microsoft.com/vstudio/diagnostics/servicemodelsink">
      <!-- Debug information (optional) -->
    </VsDebuggerCausalityData>
  </s:Header>
  <s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <Z_FI_WS_CONS_DEUD_ACR xmlns="urn:sap-com:document:sap:rfc:functions">
      <BUKRS xmlns=""/>
      <CENTRO_WG xmlns="">0002</CENTRO_WG>
      <STCD1 xmlns="">A87654321</STCD1>
      <TIPO xmlns="">A</TIPO>
    </Z_FI_WS_CONS_DEUD_ACR>
  </s:Body>
</s:Envelope>
```

### Request Parameters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `BUKRS` | String | No | Company code (can be empty) | "" |
| `CENTRO_WG` | String | Yes | Work center/location code | "0002" |
| `STCD1` | String | Yes | Customer ID to verify | "A87654321" |
| `TIPO` | String | Yes | Type identifier | "A" |

## Response Format

### Success Response
```xml
<soap-env:Envelope xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/">
  <soap-env:Header/>
  <soap-env:Body>
    <n0:Z_FI_WS_CONS_DEUD_ACRResponse xmlns:n0="urn:sap-com:document:sap:rfc:functions">
      <COD_ACR>0000123456</COD_ACR>
      <COD_DEUD/>
    </n0:Z_FI_WS_CONS_DEUD_ACRResponse>
  </soap-env:Body>
</soap-env:Envelope>
```

### Response Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `COD_ACR` | String | Creditor number (10 digits, zero-padded) | "0000123456" |
| `COD_DEUD` | String | Debtor code (usually empty in success cases) | "" |

## Test Scenarios

### Valid Customer ID Test
**Input**: `STCD1` = "A87654321"
**Expected**: `COD_ACR` returns a 10-digit creditor number

### Test Data Examples
| Customer ID | Expected Creditor Number | Notes |
|-------------|-------------------------|--------|
| A87654321 | 0000123456 | Standard test case |
| J99542516 | 0000527733 | Alternative test case |
| C99999999 | 0000995599 | Alternative case |
|  timeout  |  71m30u7   | Timeout case |

## Integration Notes

### For Developers
- The API expects exactly the SOAP envelope structure shown above
- All XML namespaces must be included as specified
- The `CENTRO_WG` parameter should typically be "0002" for testing
- Response `COD_ACR` will be automatically inserted into the cashier form field

### For QA Team
- Test with various customer ID formats (alphanumeric combinations)
- Verify the creditor number format (10 digits, zero-padded)
- Test edge cases like invalid customer IDs
- Validate XML structure in both requests and responses
- Check that the cashier application correctly receives and processes the `COD_ACR` value

## Error Handling
*Note: Please specify error response formats and codes based on your implementation*

Common error scenarios to test:
- Invalid customer ID format
- Missing required parameters
- Malformed XML requests
- Network timeouts

## Sample cURL Command
```bash
curl -X POST "YOUR_ENDPOINT_URL" \
  -H "Content-Type: text/xml; charset=utf-8" \
  -H "SOAPAction: YOUR_SOAP_ACTION" \
  -d @request.xml
```

## Troubleshooting
- Ensure all XML namespaces are correctly specified
- Verify that the SOAP envelope structure matches exactly
- Check that `STCD1` contains the customer ID in the expected format
- Confirm `CENTRO_WG` is set to "0002" for standard testing

---
*This documentation is for testing purposes only. The actual production API may have different endpoints, authentication requirements, and response formats.*