# 02 — Disk & Memory

Two of the most common IT Support questions:  
*"How much space is left?"* and *"Why is it slow?"*

---

## Commands

```bash
df -h      # disk usage (human-readable)
free -h    # available RAM
lsblk      # storage devices
```

---

## Real Output (ASUS X550JF)

```
$ free -h
              total    used    free
Mem:           7.4G    1.4G    6.0G
Swap:          4.0G    0.0G    4.0G
```

**RAM:** 7.4GB total — only 1.4GB used at idle on Ubuntu.  
Same machine used 3–4GB on Windows 10 without opening anything.

---

## Reading `df -h`

```bash
$ df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        XX G   18G   XX G  XX%  /
```

- `Use%` is the key value — above 85–90% is a risk
- `/` is the root partition (main system)

---

## IT Support Use Case

> User can't save files. Run `df -h` → `Use% 98%`. Disk full — problem identified in 5 seconds.
