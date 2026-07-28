# Linux Permissions Visualizer

## Overview

The Linux Permissions Visualizer is a simple, interactive web application designed to help users understand and manipulate Linux file permissions. It provides a clear visual representation of permissions in both octal (numeric) and symbolic (textual) notations, and generates the corresponding `chmod` command.

This tool is ideal for students, IT support professionals, and anyone working with Linux systems who needs to quickly grasp or set file permissions.

## Features

*   **Interactive Checkboxes:** Easily set read, write, and execute permissions for owner, group, and others.
*   **Real-time Conversion:** Instantly see the octal and symbolic notation updates as permissions are changed.
*   **`chmod` Command Generator:** Automatically generates the `chmod` command required to apply the selected permissions.
*   **File Preview:** A visual representation of a file icon that changes based on the applied permissions, along with a textual explanation.
*   **Common Presets:** Quick buttons for frequently used permission sets like 755, 644, 777, 600, and 700.
*   **Multilingual Support:** Available in English and Spanish.
*   **Responsive Design:** Works well on various screen sizes.

## How to Use

1.  **Select Permissions:** Use the checkboxes under "Owner," "Group," and "Others" to set the desired read (r), write (w), and execute (x) permissions.
2.  **View Results:** The "Octal Notation," "Symbolic Notation," and "chmod Command" sections will update in real-time.
3.  **Use Presets:** Click on any of the "Common Presets" buttons in the left sidebar to quickly apply a standard set of permissions.
4.  **Reset:** Click the "Reset" button in the right sidebar to clear all selected permissions.
5.  **Copy `chmod` Command:** Click on the generated `chmod` command to copy it to your clipboard.

## Technical Details

This mini-application is built using:

*   **HTML5:** For the structure and content.
*   **CSS3:** For styling and responsive design.
*   **JavaScript (Vanilla JS):** For all interactive logic, calculations, and DOM manipulation.

It follows a clean, modular structure, similar to other mini-apps in the `it-support-labs` repository, making it easy to understand and maintain.

## Installation (Local)

To run this application locally:

1.  Clone the `it-support-labs` repository:
    ```bash
    git clone https://github.com/anudoranador87/it-support-labs.git
    ```
2.  Navigate to the application directory:
    ```bash
    cd it-support-labs/mini-apps/linux-permissions-visualizer
    ```
3.  Open `index.html` in your web browser.

## Future Enhancements

*   **Advanced Permissions:** Implement support for special permissions (SUID, SGID, Sticky Bit).
*   **User/Group Management:** Integrate with a backend to simulate user and group management.
*   **Drag-and-Drop Interface:** Allow users to drag files onto the visualizer to get their current permissions.
*   **Integration with Terminal:** (Advanced) Potentially integrate with a simulated terminal to apply commands directly.

