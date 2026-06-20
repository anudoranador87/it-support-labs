/* =====================
   RESET
===================== */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* =====================
   BODY
===================== */

body {
  font-family: Inter, Arial, sans-serif;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #0f172a, #1e293b);
  color: white;
}

/* =====================
   HEADER
===================== */

header {
  text-align: center;
  margin-bottom: 2rem;
}

header h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  color: #38bdf8;
}

header p {
  color: #cbd5e1;
  font-size: 1.1rem;
}

/* =====================
   MAIN
===================== */

main {
  max-width: 1100px;
  margin: 0 auto;
}

/* =====================
   INPUTS
===================== */

.inputs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.field {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 1rem;
  border: 1px solid rgba(255,255,255,0.08);
}

.field label {
  display: block;
  margin-bottom: 0.75rem;
  color: #93c5fd;
  font-weight: 600;
}

/* INPUT NORMAL */

.field input,
.field select {
  width: 100%;
  padding: 0.85rem;
  border: none;
  border-radius: 10px;
  background: #f8fafc;
  color: #0f172a;
  font-size: 1rem;
}

/* INPUT + UNIDAD */

.size-input {
  display: flex;
  gap: 12px;
}

.size-input input {
  flex: 4;
}

.size-input select {
  flex: 1;
  min-width: 90px;
}

/* =====================
   RESULTS
===================== */

.results {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat {
  background: linear-gradient(
    135deg,
    #2563eb,
    #3b82f6
  );
  padding: 1.5rem;
  border-radius: 18px;
  box-shadow: 0 10px 25px rgba(0,0,0,.25);
  transition: all 0.25s ease;
}

.stat:hover {
  transform: translateY(-5px);
}

.stat-label {
  display: block;
  margin-bottom: .5rem;
  color: rgba(255,255,255,.8);
  font-size: .95rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
}

/* =====================
   DESCRIPTION
===================== */

.description {
  background: rgba(255,255,255,.08);
  border-left: 5px solid #38bdf8;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.description p {
  color: #e2e8f0;
  line-height: 1.6;
}

/* =====================
   DIAGRAM
===================== */

.diagram {
  background: rgba(255,255,255,.08);
  border-radius: 16px;
  padding: 2rem;
}

#disk-visual {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
}

/* =====================
   DISKS
===================== */

.disk {
  width: 90px;
  height: 120px;
  border-radius: 14px;

  background: linear-gradient(
    180deg,
    #22c55e,
    #15803d
  );

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: bold;
  color: white;

  position: relative;

  box-shadow:
    0 8px 20px rgba(0,0,0,.3),
    inset 0 2px 5px rgba(255,255,255,.2);

  transition: all .25s ease;
}

.disk:hover {
  transform: scale(1.08);
}

.disk::before {
  content: "";
  position: absolute;
  top: 12px;
  width: 45px;
  height: 6px;
  border-radius: 10px;
  background: rgba(255,255,255,.4);
}

.disk::after {
  content: "";
  position: absolute;
  bottom: 10px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 10px #4ade80;
}

/* =====================
   SCROLLBAR
===================== */

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #0f172a;
}

::-webkit-scrollbar-thumb {
  background: #3b82f6;
  border-radius: 10px;
}

/* =====================
   RESPONSIVE
===================== */

@media (max-width: 768px) {

  body {
    padding: 1rem;
  }

  header h1 {
    font-size: 2rem;
  }

  .stat-value {
    font-size: 1.5rem;
  }

  .disk {
    width: 70px;
    height: 95px;
  }

  .size-input {
    flex-direction: column;
  }

  .size-input select {
    width: 100%;
  }
}