touch test.db

sqlite3 "test.db" <<EOF
.read "test.sql"
.exit
EOF

if [ $? -ne 0 ]; then
    echo "Testing failed."
else
    echo "All tests passed."
fi


rm test.db
