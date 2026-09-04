# Python for IT Support and System Administration

## Purpose

Python is useful in IT Support when a repeated manual task can be described as **input → process → output**. The most practical uses are collecting system information, processing CSV files, analysing logs, checking files and directories, executing diagnostic commands and producing a clear report.

## Core building blocks

The foundations used in support scripts are variables, strings, numbers, lists, dictionaries, booleans, conditions, loops and functions. A small script should have a clear function for each responsibility instead of putting every operation in one long block.

Useful built-in functions include `len()`, `type()`, `isinstance()`, `enumerate()`, `zip()`, `sorted()`, `sum()`, `min()`, `max()`, `all()` and `any()`.

```python
hosts = ["dc01", "cli01", "srv02"]

for position, host in enumerate(hosts, start=1):
    print(position, host)
```

Use `zip(..., strict=True)` when two collections must have the same length. Use `all()` when every check must pass and `any()` when one successful check is enough.

## Files and paths

Python can read, write, create, move and copy files. `pathlib` is a clear modern interface for paths, while `shutil` is useful for copying, moving and archiving.

```python
from pathlib import Path

log_dir = Path("logs")
log_dir.mkdir(exist_ok=True)

for log_file in log_dir.glob("*.log"):
    print(log_file)
```

Use `with open(...)` so that Python closes the file automatically. The `w` mode overwrites existing content, `a` appends to the end and `r` reads an existing file. Use an explicit encoding for text files.

```python
from pathlib import Path

path = Path("report.txt")

with path.open("w", encoding="utf-8") as file:
    file.write("System check completed\n")

with path.open("r", encoding="utf-8") as file:
    content = file.read()
```

Before writing or deleting, check whether the path is the expected file. Be especially careful with `shutil.rmtree()` because it removes a complete directory tree.

## CSV data

CSV files are common in administration for inventories, users, devices, tickets and exported logs. `csv.DictReader` allows a script to work with column names instead of numerical positions.

```python
import csv

with open("users.csv", newline="", encoding="utf-8") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row["username"], row["department"])
```

The normal automation flow is:

```text
CSV input → Python reads records → rules are applied → output report or file
```

When generating CSV output, use `csv.DictWriter` when the fields have names. Validate required columns and handle empty or malformed rows before performing an administrative action.

## Regular expressions and log analysis

A regular expression searches for a pattern rather than a fixed position. This makes it useful when a log line changes slightly but still contains the same kind of information.

```python
import re

line = "ERROR [12345] connection refused"
match = re.search(r"\[(\d+)\]", line)

if match:
    print(match.group(1))
```

`re.search()` returns the first match or `None`, `re.findall()` returns all matches and `re.sub()` replaces matching text. Raw strings such as `r"\d+"` avoid accidental interpretation of backslashes.

The same ideas can be practised in Linux with `grep`, `sed` and `awk`. For example, `grep -i error application.log` finds lines containing `error` without depending on letter case.

## Running system commands

The `subprocess` module lets Python execute a diagnostic command and inspect its exit code and output. Keep commands explicit and avoid passing untrusted text to a shell.

```python
import subprocess

result = subprocess.run(
    ["ipconfig", "/all"],
    capture_output=True,
    text=True,
    timeout=10,
    check=False,
)

if result.returncode == 0:
    print(result.stdout)
else:
    print(result.stderr)
```

On Linux, the same pattern can be used with commands such as `df -h`, `ip addr`, `systemctl status` or `journalctl`. A timeout prevents a support script from waiting indefinitely.

## Error handling

A support automation script should report predictable failures instead of failing silently. Handle missing files, permission errors, invalid input, failed commands and timeouts separately when the response is different.

```python
from pathlib import Path

try:
    content = Path("config.txt").read_text(encoding="utf-8")
except FileNotFoundError:
    print("Configuration file not found")
except PermissionError:
    print("Insufficient permissions")
except OSError as error:
    print(f"Filesystem error: {error}")
```

## Security principles

Do not store passwords in source code, use administrator privileges only when required, validate input, restrict permissions on generated reports, log important operations and test a script in a safe environment before using it on production systems. Never use `eval()` or `exec()` with text received from a user, file or network. Least privilege applies to automation just as it applies to user accounts.

## Testing automation

Testing checks that a function produces the expected result and helps prevent regressions when a script changes. A unit test should be isolated from the Internet, production databases and real user data.

```python
import unittest


def normalise_host(name):
    return name.strip().lower()


class TestNormaliseHost(unittest.TestCase):
    def test_removes_spaces_and_lowercases(self):
        self.assertEqual(normalise_host(" DC01 "), "dc01")

    def test_empty_name_is_allowed_by_this_function(self):
        self.assertEqual(normalise_host(""), "")


if __name__ == "__main__":
    unittest.main()
```

The Arrange–Act–Assert pattern keeps tests readable. Test normal input, empty input, invalid input and edge cases. Run tests with:

```bash
python -m unittest -v
```

## Practical support automation ideas

The most relevant projects for this portfolio are a system information collector, disk-space monitor, log analyser, file organiser, CSV user report, process checker and backup helper. Each project should include a README, sample input, sample output, error handling and a verification step.

Future Python automation can become a practical portfolio lab by generating reports from CSV input or checking DNS and system information before a domain join. Each script should be accompanied by sample input and output, safe error handling and a verification step.
