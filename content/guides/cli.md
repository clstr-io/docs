---
title: CLI
weight: 1
---

# CLI

## Installation

### `go install`

```console
$ go install github.com/clstr-io/clstr/cmd/clstr@latest
```

This installs `clstr` to your `$GOPATH/bin` directory. Make sure it's in your `$PATH`.

You can also install a specific version using tags (see [available versions](https://github.com/clstr-io/clstr/tags)):

```console
$ go install github.com/clstr-io/clstr/cmd/clstr@v0.4.0
```

#### Update

```console
$ go install github.com/clstr-io/clstr/cmd/clstr@latest
```

### Homebrew

```console
$ brew tap clstr-io/tap
$ brew install clstr-io/tap/clstr
```

#### Update

```console
$ brew upgrade clstr-io/tap/clstr
```

### Verify Installation

```console
$ clstr list
Available challenges:

  kv-store             - Distributed Key-Value Store (8 stages)

Start with: clstr init <challenge-name>
```

## Quick Start

```console
$ clstr init kv-store    # Create challenge in current directory
$ clstr test             # Test your implementation
$ clstr next             # Advance to the next stage
```

Edit `run.sh` to launch your implementation, then run `clstr test` to get feedback.

> [!NOTE]
> Commands support short aliases for faster typing:
> - `clstr i` → `clstr init`
> - `clstr t` → `clstr test`
> - `clstr n` → `clstr next`
> - `clstr s` → `clstr status`
> - `clstr l` or `clstr ls` → `clstr list`

## Basic Workflow

### 1. Start a Challenge

```console
$ clstr init <challenge> [path]
```

Creates a new challenge directory with:
- `run.sh` - Script that builds and runs your implementation
- `README.md` - Challenge overview and requirements
- `clstr.state` - Tracks your progress
- `.gitignore` - Ignores `.clstr/` working directory (server files and logs)

**Examples:**

```console
$ clstr init kv-store           # Create in current directory
$ clstr init kv-store my-kvs    # Create in ./my-kvs
```

### 2. Implement & Test

Edit `run.sh` to start your implementation.
The script must launch your server and pass through any arguments from `clstr`:

```bash
#!/bin/bash -e

# Go
exec go run ./cmd/server "$@"

# Python
# exec python main.py "$@"

# Rust
# cargo build --release && exec ./target/release/kvstore "$@"

# Node.js
# exec node server.js "$@"
```

Then test:

```console
$ clstr test
```

**When tests pass:**
```
PASSED ✓

Run 'clstr next' to advance to the next stage.
```

**When tests fail:**
```
FAILED ✗

PUT http://127.0.0.1:45123/kv/ "foo"
  Expected: "key cannot be empty"
  Actual: ""

  Your server accepted an empty key when it should reject it.
  Add validation to return 400 Bad Request for empty keys.

Read the guide: clstr.io/kv-store/http-api
```

Fix the issues, then run `clstr test` again. The CLI is designed for quick iteration, just keep running `clstr test` as you make changes.

### 3. Progress Through Stages

```console
$ clstr next
```

Advances to the next stage after verifying the current stage passes. Updates `clstr.state` automatically.

If the current stage hasn't been completed, `clstr next` runs tests first and only advances if they pass.

## Commands Reference

Run `clstr --help` to see all available commands, or `clstr <command> --help` for command-specific options.

### clstr init

**Usage:** `clstr init <challenge> [path]`

Creates a new challenge in the specified directory (or current directory if not specified).

### clstr test

**Usage:** `clstr test [stage]`

Runs tests for the current stage (from `clstr.state`) or a specific stage if provided.

```console
$ clstr test                # Test current stage
$ clstr test persistence    # Test specific stage
```

**Flags:**
- `--so-far` - Test all stages up to and including the specified stage

```console
$ clstr test persistence --so-far    # Test all stages from http-api through persistence
```

This is useful for regression testing to ensure earlier stages still pass as you progress through the challenge.

### clstr next

**Usage:** `clstr next`

Advances to the next stage after verifying current stage passes all tests. Updates `clstr.state` automatically.

### clstr status

**Usage:** `clstr status`

Shows challenge progress and next steps:

```console
$ clstr status
Distributed Key-Value Store

Build a distributed key-value store from scratch using the Raft consensus algorithm.

Progress:
✓ http-api           - Store and Retrieve Data
✓ persistence        - Data Survives SIGTERM
✓ crash-recovery     - Data Survives SIGKILL
→ leader-election    - Cluster Elects and Maintains Leader
  log-replication    - Data Replicates to All Nodes
  membership-changes - Add and Remove Nodes Dynamically
  fault-tolerance    - Cluster Survives Failures and Partitions
  log-compaction     - System Manages Log Growth

Read the guide: clstr.io/kv-store/leader-election

Implement leader-election, then run 'clstr test'.
```

### clstr list

**Usage:** `clstr list`

Lists all available challenges with stage counts.

## Understanding clstr.state

The state file tracks your progress with a simple format:

```
kv-store:persistence
```

Format: `<challenge>:<stage>`
