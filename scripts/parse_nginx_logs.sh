
LOG_PATH=$1
TIMEFRAME=$2

OUTPUT_FILE="parsed_logs.json"

awk -v timeframe="$TIMEFRAME" '
BEGIN {
    start = systime() - timeframe;
}
{
    split($4, date, "[/: ]");
    log_time = mktime(date[3] " " date[2] " " date[1] " " date[5] " " date[6] " " date[7]);
    if (log_time >= start) {
        ip_count[$1]++;
    }
}
END {
    for (ip in ip_count) {
        print ip " " ip_count[ip];
    }
}' $LOG_PATH | sort -k2 -nr | jq -R -s -c 'split("\n") | map(select(length > 0) | split(" ") | {"ip": .[0], "count": .[1] | tonumber})' > $OUTPUT_FILE

echo "Log parsing completed. Output saved to $OUTPUT_FILE."
