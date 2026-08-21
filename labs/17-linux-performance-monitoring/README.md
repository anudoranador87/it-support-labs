# Lab 17 — Linux Performance Monitoring

**Category:** Linux / Performance Troubleshooting  
**Level:** Intermediate  
**Platform:** Ubuntu Linux  
**CompTIA A+ alignment:** Troubleshooting, operating systems, performance monitoring

---

## 🎯 Objective

Investigate high CPU usage on a Linux system, identify the process responsible, observe system behaviour under load, and verify the effect of corrective action using standard command-line tools.

This lab is based on the earlier **Lab-06 — Linux Monitoring** from the legacy collection and has been reorganized as a troubleshooting-focused lab.

---

## 📋 Scenario

A Linux workstation becomes slow and CPU utilisation remains unusually high.

The task is to determine:

1. Whether CPU utilisation is actually abnormal.
2. Which process is consuming CPU resources.
3. How the process affects overall system performance.
4. What happens when the process is terminated or its priority is adjusted.
5. Whether system performance returns to a normal state.

---

## 🧰 Tools

| Tool / command | Purpose |
|---|---|
| `top` | Real-time process and CPU monitoring |
| `ps` | Inspect running processes |
| `kill` | Send a signal to a process |
| `renice` | Adjust process scheduling priority |
| `grep` | Filter process information |
| `/proc` | Inspect Linux process/system information |

---

## 🔎 Troubleshooting Method

### 1. Establish a baseline

Start with a live view of system activity:

```bash
top
```

Observe:

- CPU utilisation
- load average
- memory utilisation
- running processes
- the process currently consuming the most CPU

The important point is to **observe before changing anything**.

---

### 2. Identify the process

Use `ps` when a more focused process listing is required:

```bash
ps aux --sort=-%cpu | head
```

This places the processes with the highest CPU usage first.

Record the relevant PID and command before taking corrective action.

---

### 3. Reproduce or observe the load

If a controlled process is generating CPU activity, monitor the system while the load is present.

Useful observations include:

- CPU percentage used by the process
- load average
- whether other applications become slower
- whether the process remains consistently at the top of the list

A performance diagnosis should be based on repeated observations rather than a single instantaneous value.

---

### 4. Apply a controlled corrective action

If the process is confirmed as unnecessary or intentionally created for the lab, terminate it using its PID:

```bash
kill <PID>
```

Prefer the normal termination signal first. Escalation to a stronger signal should only be considered when a process does not respond appropriately.

For a process that must remain running but should receive less CPU scheduling priority, `renice` can be used:

```bash
renice 10 -p <PID>
```

The exact priority change should be recorded as part of the troubleshooting evidence.

---

### 5. Verify the result

Return to the monitoring view:

```bash
top
```

Then verify that:

- the target process is no longer consuming CPU, or its priority has changed as intended;
- CPU utilisation has changed accordingly;
- system responsiveness has improved;
- no unrelated process has become the new abnormal resource consumer.

This verification step is essential: **a command being executed successfully is not proof that the incident is resolved.**

---

## 🧠 Troubleshooting Logic

```text
Symptom: system is slow / CPU usage is high
                ↓
        Monitor with top
                ↓
      Identify high-CPU PID
                ↓
       Confirm with ps
                ↓
       Assess the process
          ↙           ↘
     unnecessary     required
        ↓               ↓
     kill PID       renice / investigate
        ↓               ↓
        └───────┬───────┘
                ↓
       Monitor system again
                ↓
          Verify recovery
```

---

## 📊 Evidence to Capture

For a complete portfolio submission, capture evidence at these points:

- [ ] `top` showing the initial performance state
- [ ] `ps aux --sort=-%cpu | head` identifying the process
- [ ] PID and command recorded before intervention
- [ ] Corrective command used
- [ ] `top` after intervention
- [ ] Final verification showing the expected change

### 🎥 Demonstration

The original legacy Lab-06 included a CPU monitoring demonstration. The recording should be retained as historical evidence and linked here once its repository path is confirmed.

> **Evidence status:** The legacy lab contains the original demonstration; the video should be moved into this lab without re-recording it, provided the file is still available in the repository history.

---

## ⚠️ Technical Notes

### CPU utilisation is not automatically an incident

A high CPU percentage can be legitimate during compilation, rendering, compression, updates, or other intensive workloads. Diagnosis requires context.

### `kill` does not mean "delete the process immediately"

`kill <PID>` normally sends `SIGTERM`, allowing the process an opportunity to exit cleanly.

### `renice` changes scheduling priority

It does not stop a process. It changes how the scheduler treats the process relative to other work.

---

## ✅ Verification Checklist

- [ ] Established a performance baseline
- [ ] Identified the process responsible for the observed CPU load
- [ ] Recorded the PID before intervention
- [ ] Used an appropriate corrective action
- [ ] Rechecked CPU utilisation after the intervention
- [ ] Confirmed the expected system behaviour
- [ ] Documented evidence and findings

---

## 📚 Related Labs

- **Lab 05 — Linux Basics:** foundational Linux commands and troubleshooting cases
- **Lab 07 — Linux Network:** Linux connectivity and DNS troubleshooting

---

**Author:** José María Aparicio Portillo  
**Source:** Legacy Lab-06 — Linux Monitoring  
**Status:** ✅ Migrated and restructured