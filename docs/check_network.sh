#!/bin/bash

echo "=========================================="
echo "   QUICK NETWORK DIAGNOSTICS - IT SUPPORT"
echo "=========================================="

# 1. Verify Local IP
echo -e "\n[1] Local IP:"
ip addr show | grep "inet " | grep -v "127.0.0.1" | awk '{print $2}'

# 2. Test connection to Router (Gateway)
echo -e "\n[2] Testing Gateway (Router):"
GATEWAY=$(ip route | grep default | awk '{print $3}')
if ping -c 1 -W 1 $GATEWAY > /dev/null; then
    echo "✅ Connection to Router ($GATEWAY) OK"
else
    echo "❌ NO connection to Router ($GATEWAY)"
fi

# 3. Test DNS (Google)
echo -e "\n[3] Testing DNS resolution (google.com):"
if nslookup google.com > /dev/null 2>&1; then
    echo "✅ DNS working correctly"
else
    echo "❌ DNS resolution error"
fi

# 4. Test External Internet
echo -e "\n[4] Testing Internet (Ping 8.8.8.8):"
if ping -c 1 -W 1 8.8.8.8 > /dev/null; then
    echo "✅ Internet OK"
else
    echo "❌ No Internet access"
fi

echo -e "\n=========================================="
echo "        DIAGNOSTICS FINISHED"
echo "=========================================="
