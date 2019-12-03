#!/bin/bash
python3 ./flask_server/src/handlers.py & # this is to run travis, comment if you need to run it locally 
py.test ./flask_server/test/test_minimal-200.tavern.yaml -v
py.test ./flask_server/test/test_minimal-400.tavern.yaml -v
py.test ./flask_server/test/test_minimal-404.tavern.yaml -v