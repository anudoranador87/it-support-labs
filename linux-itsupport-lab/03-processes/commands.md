# 03 — Processes

When a user says *"the computer is slow"*, this is where you look.

---

## Commands

```bash
top                     # real-time monitor
ps aux                  # list all processes
ps aux | grep firefox   # find a specific process
```

---

## Reading `top`

```
top - 08:28:32 up 10 min,  1 user,  load average: 0.04, 0.26, 0.20
Tasks: 242 total,   1 running, 241 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.2 us,  0.2 sy,  0.0 ni, 99.5 id ...

  PID USER      %CPU  %MEM  COMMAND
 4435 jose       1.0   2.1  ptyxis
```

### Key Lines

| Field | Value | Meaning |
|-------|-------|---------|
| `99.5 id` | idle | CPU almost unused ✅ |
| `0 zombie` | — | No orphan processes ✅ |
| `242 total` | — | Normal for Ubuntu |

### Process States (S column)

| State | Meaning |
|-------|---------|
| `S` | Sleeping — waiting |
| `R` | Running — currently executing |
| `I` | Idle — kernel thread inactive |
| `Z` | Zombie — orphan process ⚠️ |

---

## Shortcuts inside `top`

| Key | Action |
|-----|--------|
| `M` | Sort by memory |
| `P` | Sort by CPU |
| `k` | Kill process (asks for PID) |
| `q` | Quit |

---

## IT Support Use Case

> CPU at 99% sustained → `top` → sort by CPU with `P` → identify the process → decide whether to kill it with `k` or investigate further.
