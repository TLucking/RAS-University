---
title: Kinematics
parent: Courses
layout: default
math: mathjax
---
# Kinematics

- Table of Contents
{:toc}

## 1. Prerequisites

To get the most out of this Kinematics module, it’s helpful to have:

1. **Basic Mathematics**  
   - Familiarity with **trigonometry** (sine, cosine, angle addition formulas).  
   - Understanding of **linear algebra** (vectors, matrices, basic matrix operations).  
   - Comfort with **calculus** (especially differentiation), which is useful for topics like velocity kinematics and the Jacobian.

2. **Fundamental Physics or Mechanics**  
   - Basic concepts of **rigid-body motion** (translational and rotational movement).  
   - General understanding of **forces** and **torques** can be helpful, though kinematics itself does not address them directly.

3. **Programming Skills (Recommended)**  
   - Some experience with **Python** or a similar high-level language for implementing coding exercises.  
   - Familiarity with using libraries like `math` (or NumPy/Matplotlib if you want to do more advanced plotting and calculations).

While you don’t need to be an expert in any one of these areas, having a comfortable grasp of each will make your study of kinematics more productive and enjoyable.


## 2. General Motivation

![Delta Robot Pick and Place](https://www.youtube.com/watch?v=8j5hPlHTZI8)

Have you ever watched a precision robot—like the Delta robot in the video—pick and place objects at incredible speed and accuracy? These agile machines seem are well known for their fluidity and precision. But behind the impressive motion lies a well-structured branch of mechanics called **kinematics**.

Kinematics, often referred to as the “**geometry of movement**,” is the study of *how bodies move in space without considering the forces or torques causing the motion*. By focusing on the geometry and arrangement of joints, links, and end-effectors, kinematics allows us to:

- Predict and Control Robot Positions: From assembly lines to surgical suites, robots must position their end-effectors at **exact points in space**. Kinematics equations provide the road map, telling us how each joint angle translates into a specific position and orientation.

- Design Efficient Mechanisms: Whether it’s a Delta robot on a factory floor or a humanoid robot in a research lab, well-planned kinematic structures enable robots to work **faster**, with better range of motion and fewer mechanical constraints.

- Streamline Path Planning: From pick-and-place tasks to drawing complex shapes, kinematics helps in **calculating paths**, ensuring the robot can move smoothly from one point to another without collisions or awkward joint motions.

In this chapter, you’ll explore different ways of representing positions and orientations in 3D space, understand the kinematics behind common robotic joints, and learn a systematic way to map your robot’s geometry into the equations that bring the entire mechanism to life. By mastering kinematics, you’ll have a strong foundation for making robots move **precisely** and **reliably**, unlocking a world of innovative possibilities.


## 3. Course Content
This section of the course is primarily based on content shared by **Mohammad Zainullah Khan**, an engineer with a Master’s degree in Mechanical Engineering (specializing in robotics, design, and mechatronics) from the University of Dayton. You can find more information on his website: [www.zainullah.com](https://www.zainullah.com/).

Mohammad’s videos are **well-structured**, **visually engaging** and **not very long** (less than 10 minute), making them an excellent resource for anyone beginning to study kinematics for robotics. We recommend starting with the videos listed below to build a solid foundation. 

Once you’ve grasped the basics, you can further strengthen your understanding by working through both pen-and-paper exercises and coding tasks. These hands-on activities will help you verify that you have truly mastered the core concepts.



### Chapter 0 : Introduction to Robotics | Kinematics & Modeling

This video gives you an introduction of the meaning of kineamtics and modeling and will present you how his videos will be strucured.
![Robotics 101: Full course for beginners](https://www.youtube.com/watch?v=K_xIJBlbjg4&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA)

#### Questions

<!-- Conceputal questions -->
<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- First question  -->
<p><strong>Question 1: How long are Mohammad's videos typically?</strong></p>
<form id="mcq1">
  <input type="radio" name="duration" value="10"> Less than 10 minutes<br>
  <input type="radio" name="duration" value="30"> Around 30 minutes<br>
  <input type="radio" name="duration" value="60"> Around 1 hour<br>
  <button type="button" onclick="checkMCQ1()">Check Answer</button>
  <p id="mcq1-feedback"></p>
</form>

<script>
function checkMCQ1() {
  const options = document.getElementsByName('duration');
  let selectedValue = null;
  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      selectedValue = options[i].value;
      break;
    }
  }
  
  const feedback = document.getElementById('mcq1-feedback');
  if (!selectedValue) {
    feedback.textContent = "Please select an option.";
    feedback.style.color = "red";
    return;
  }
  
  if (selectedValue === "10") {
    feedback.textContent = "Correct! Mohammad's videos usually last less than 10 minutes.";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "Incorrect. Try again.";
    feedback.style.color = "red";
  }
}
</script>

<!-- Second question  -->
<p><strong>Question 2: Forward kinematics (FK) is...</strong></p>
<form id="mcq-fk">
  <!-- Option 1 (Correct) -->
  <input type="radio" name="fk" value="option1"> How changing robot parameters (joint angles, link lengths) affects the end-effector’s position and orientation<br>
  
  <!-- Option 2 (Incorrect) -->
  <input type="radio" name="fk" value="option2"> A method for computing the joint torques necessary for stable contact with the environment<br>
  
  <!-- Option 3 (Incorrect) -->
  <input type="radio" name="fk" value="option3"> Given a desired position and orientation of the end-effector, find the joint variables<br>
  
  <button type="button" onclick="checkFKMCQ()">Check Answer</button>
  <p id="fk-feedback"></p>
</form>

<script>
function checkFKMCQ() {
  const options = document.getElementsByName('fk');
  let selectedValue = null;

  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      selectedValue = options[i].value;
      break;
    }
  }

  const feedback = document.getElementById('fk-feedback');

  if (!selectedValue) {
    feedback.textContent = "Please select an option.";
    feedback.style.color = "red";
    return;
  }

  if (selectedValue === "option1") {
    feedback.textContent = "Correct! Forward kinematics calculates how changes in joint angles or link lengths affect the end-effector pose. The inverse is simply called **Inverse Kinematics**";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "Incorrect. Please try again!";
    feedback.style.color = "red";
  }
}
</script>

</details>

### Chapter 1: Coordinate Transformations in 2D | Mapping {#chapter-1-coordinate-transformations-in-2D}

In this chapter, we focus on 2D coordinate transformations—specifically, pure translations and pure rotations for planar (serial) robots.

An introduction to 2D translations and rotations:
![Coordinate Transformations in 2D : Mapping Part 1](https://www.youtube.com/watch?v=H_94DTWd8ck&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=2)

Explains how translations and rotations combine simultaneously:
![Coordinate Transformations in 2D : Mapping Part 2](https://www.youtube.com/watch?v=TWTMoFvcBFc&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=3)

Discusses how to handle successive coordinate transformations step by step:
![Coordinate Transformations in 2D : Mapping Part 3](https://www.youtube.com/watch?v=R_hxO5xBYfI&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=4)

As you've seen, a **general motion in the plane** can be described by a combination of translations and rotations around the origin. A sequence of translations and rotations comes up against the fact that the translation is a vector addition while the rotation a matrix multiplication.

It would be very desirable to be able to integrate rotation and translation in a single operation in order to be able to link them together. The **homogeneous matrices** allow this integration of the translation into the transformation matrix. The price to pay is to increase the order of the matrix by one. The translation vector t is added to the right and a line [0 0 1] at the bottom:

$$
\begin{bmatrix}
    R & \mathbf{t} \\
    0 & 1 
\end{bmatrix} = 
\begin{bmatrix}
    \cos \theta & -\sin \theta & t_x  \\
    \sin \theta & \cos \theta  & t_y  \\
    0           & 0            & 1 
\end{bmatrix}
$$  

This is **the homogeneous matrix** of transformation in a two‐dimensional space (a plane), the third line has no spatial significance (no z axis for the moment !!). This matrix acts on a **homogeneous vector** in a two‐dimensional space which consists of its two coordinates plus a "scale factor" equal to one:
$$
\mathbf{v} =
\begin{bmatrix}
x \\
y \\
1
\end{bmatrix}.
$$   

To find the familiar vectors, just delete the last element. Matrices and homogeneous vectors for three dimensions contain four elements.

<!-- Conceptual Questions -->
<details markdown="1">
  <summary>Conceptual Questions</summary>

<!-- Question 1 -->
<p><strong>Question 1: Is the following equality true?</strong></p>
<p>R(θ<sub>1</sub>) · R(θ<sub>2</sub>) = R(θ<sub>2</sub>) · R(θ<sub>1</sub>)</p>
<form id="q1-form">
  <input type="radio" name="form" value="true"> True<br>
  <input type="radio" name="form" value="false"> False<br>
  <button type="button" onclick="checkQ1()">Check Answer</button>
  <p id="form-feedback"></p>
</form>

<script>
function checkQ1() {
  // Grab the value of the selected radio button for question 1
  const q1Options = document.getElementsByName("form");
  let q1Selected = null;
  for (let i = 0; i < q1Options.length; i++) {
    if (q1Options[i].checked) {
      q1Selected = q1Options[i].value;
      break;
    }
  }

  const q1Feedback = document.getElementById("form-feedback");

  // Ensure an option was selected
  if (!q1Selected) {
    q1Feedback.textContent = "Please select True or False.";
    q1Feedback.style.color = "red";
    return;
  }

  // Question 1 is TRUE
  if (q1Selected === "true") {
    q1Feedback.textContent = "Correct! R(θ1)*R(θ2) = R(θ1+θ2) = R(θ2+θ1) = R(θ2)*R(θ1).";
    q1Feedback.style.color = "green";
  } else {
    q1Feedback.textContent = "Incorrect. Please try again !";
    q1Feedback.style.color = "red";
  }
}
</script>

<!-- Second question  -->
<p><strong>Question 2: The matrix 
  <p>\[
  \begin{bmatrix}
  c & -s & tx \\
  s & c & ty \\
  0 & 0 & 1
  \end{bmatrix}
  \]</p> correspond to ...</strong></p>
<form id="mcq-ho">
  <!-- Option 1 (Incorrect) -->
  <input type="radio" name="ho" value="option1"> a translation followed by a rotation<br>
  
  <!-- Option 2 (Correct) -->
  <input type="radio" name="ho" value="option2"> a rotation followed by a translation<br>
  
  <button type="button" onclick="checkhomo()">Check Answer</button>
  <p id="ho-feedback"></p>
</form>

<script>
function checkhomo() {
  const options = document.getElementsByName('ho');
  let selectedValue = null;

  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      selectedValue = options[i].value;
      break;
    }
  }

  const feedback = document.getElementById('ho-feedback');

  if (!selectedValue) {
    feedback.textContent = "Please select an option.";
    feedback.style.color = "red";
    return;
  }

  if (selectedValue === "option2") {
    feedback.textContent = "Correct! (prove can be found in the mathematical development question)";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "Incorrect. Please try again!";
    feedback.style.color = "red";
  }
}
</script>
</details>

<!-- Mathematical Development Questions -->
<details markdown="1">
  <summary>Mathematical Development Questions</summary>

  <!-- Question 1 -->
  <p><strong>Question 1: </strong> Express the homogeneous transformation matrix representing a rotation by angle θ followed by translation (t_x, t_y) in a 2D plane.</p>

  <details markdown="1">
    <summary>Answer</summary>
    \[
    \begin{aligned}
    T &= \begin{bmatrix}
    \cos\theta & -\sin\theta & t_x \\
    \sin\theta & \cos\theta & t_y \\
    0 & 0 & 1
    \end{bmatrix}
    = 
    \begin{bmatrix}
    R(\theta) & t \\
    0 & 1
    \end{bmatrix}
    \quad\text{where}\quad
    R(\theta) = 
    \begin{bmatrix}
    \cos\theta & -\sin\theta \\
    \sin\theta & \cos\theta
    \end{bmatrix}\]
  </details>

  <!-- Question 2 -->
  <p><strong>Question 2: </strong> Express the homogeneous transformation matrix representing a translation \( t = (t_x, t_y) \) followed by a rotation by angle \( \theta \) in a 2D plane.</p>

  <details markdown="1">
    <summary>Answer</summary>
    \[
    \begin{aligned}
    T &= \begin{bmatrix}
    \cos\theta & -\sin\theta & \cos\theta \cdot t_x - \sin\theta \cdot t_y \\
    \sin\theta & \cos\theta & \sin\theta \cdot t_x + \cos\theta \cdot t_y \\
    0 & 0 & 1
    \end{bmatrix}
    = 
    \begin{bmatrix}
    R(\theta) & R(\theta) \cdot t \\
    0 & 1
    \end{bmatrix}
    \quad\text{where}\quad
    R(\theta) = 
    \begin{bmatrix}
    \cos\theta & -\sin\theta \\
    \sin\theta & \cos\theta
    \end{bmatrix}
    \]
  </details>

<!-- Question 3 -->
  <p><strong>Question 3: </strong> Express the homogeneous transformation matrix representing the following sequence: rotation by \( \theta_1 \), translation by \( t_1 = (t_{1x}, t_{1y}) \), rotation by \( \theta_2 \), and finally translation by \( t_2 = (t_{2x}, t_{2y}) \).</p>

  <details markdown="1">
    <summary>Answer</summary>

    \[
    \begin{aligned}
    T &= \begin{bmatrix}
    \cos(\theta_1+\theta_2) & -\sin(\theta_1+\theta_2) & t_{1x}\cos\theta_1 - t_{1y}\sin\theta_1 + t_{2x}\cos(\theta_1+\theta_2) - t_{2y}\sin(\theta_1+\theta_2) \\
    \sin(\theta_1+\theta_2) & \cos(\theta_1+\theta_2) & t_{1x}\sin\theta_1 + t_{1y}\cos\theta_1 + t_{2x}\sin(\theta_1+\theta_2) + t_{2y}\cos(\theta_1+\theta_2) \\
    0 & 0 & 1
    \end{bmatrix}
    \]

    This matrix can also be expressed compactly as:
    \[
    T = R(\theta_1) T(t_1) R(\theta_2) T(t_2)
    \]
      
      where each matrix is defined accordingly:
      
    \[
    R(\theta) = \begin{bmatrix}
    \cos\theta & -\sin\theta & 0 \\
    \sin\theta & \cos\theta & 0 \\
    0 & 0 & 1
    \end{bmatrix}, \quad
    T(t) = \begin{bmatrix}
    1 & 0 & t_x \\
    0 & 1 & t_y \\
    0 & 0 & 1
    \end{bmatrix}
    \]

  </details>


</details>



## Chapter 2: Forward Kinematics of robots | Planar 2D robots

This chapter introduces [forward kinematics](#forward-and-inverse-kinematics) 

![Forward Kinematics of robots](https://www.youtube.com/watch?v=svyhLDAoyKc&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=5)



## Chapter 3: Forward Kinematics (with solved examples) | Homogeneous Transformations 
![examples](https://www.youtube.com/watch?v=mO7JJxaVtkE&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=6)

![examples2](https://www.youtube.com/watch?v=zg5sS9LZGAM&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=7)

## Chapter 4: How do robots avoid collisions? | Branched Homogeneous Transforms
![Homogeneous Transforms](https://www.youtube.com/watch?v=WQTnCIhkzNc&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=8)

## Chapter 5: Inverse Kinematics of Robots
![Inverse Kinematics of Robots](https://www.youtube.com/watch?v=1-FJhmey7vk&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=9)

![example_inverse_kinematics](https://www.youtube.com/watch?v=EzZDRwmk8Nw&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=10)

## Chapter 6: Velocity Kinematics
![Velocity Kinematics & Jacobian Matrix](https://www.youtube.com/watch?v=Wud3aCXiSm8&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=11)

![Velocity Kinematics & Manipulability Ellipsoids](https://www.youtube.com/watch?v=gdSTcJwf3L0&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=12)

## Chapter 7: How to find Jacobian Matrix? | Solved Examples
![how to find Jacobian Matrix](https://www.youtube.com/watch?v=EdvAHmIONMs&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=13)

## Chapter 8: Robot Singularities & how to find them
![Robot Singularities & how to find them](https://www.youtube.com/watch?v=WXEOr7X2bPE&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=14)


## Exercises

### Pen & Paper Exercises

#### Exercise 1:
For the following structures:
![examples]({{ site.baseurl }}/assets/images/kinematics/ex1_1.png)

What is the: 
1. Number of motors? 
2. Mobility (MO)? 
3. Number of degrees of freedom (DOF)?

<details markdown="1">
  <summary>Solution</summary>

  **Reminder:** The mobility of a serial robot is always equal to its number of motors. All the joints of a serial robot are actuated (motorized).  

  1. **(a)** The Stäubli TX60 has 6 motorized joints: RRR for the handler and RRR for the wrist.  
     **(b)** The second robot has 5 motorized joints: RTT for the handler and RR for the wrist.  

  2. **(a)** Stäubli TX60: MO = 6.  
     **(b)** Second robot: MO = 5.  

  3. **(a)** Stäubli TX60: DOF = 6; three translations of the tool and three rotations in the space of the tool.  
     **(b)** Second robot: DOF = 5; three translations of the tool and two rotations in the space of the tool.  

</details>

### Coding Exercises
These exercises will help you practice the fundamental concepts of kinematics by translating them into Python code. You can run these snippets in a local Python environment or online in services like Google Colab, Jupyter Notebook, or similar platforms.

---

## 1. Forward Kinematics of a 2-Link Planar Manipulator

**Objective:**  
Write a function that computes the end-effector position (x, y) of a 2-link planar robot arm given two joint angles $\theta_1$ and $\theta_2$.

**Robot Description:**  
- Link 1 has length $L_1$.  
- Link 2 has length $L_2$.  
- Joint angles $\theta_1$ and $\theta_2$ are measured from the x-axis (or from the previous link’s axis).

**Kinematic Equations:**  
$
\begin{aligned}
    x &= L_1 \cos(\theta_1) + L_2 \cos(\theta_1 + \theta_2) \\
    y &= L_1 \sin(\theta_1) + L_2 \sin(\theta_1 + \theta_2)
\end{aligned}
$

**Instructions:**  
1. Define a Python function called `forward_kinematics_2link(theta1, theta2, L1, L2)` that returns `(x, y)`.  
2. Test your function with different angle values to see if the outputs make sense.

```python
def forward_kinematics_2link(theta1, theta2, L1, L2):
    """
    Calculate the (x, y) position of the end-effector of a 2-link planar robot arm.
    
    Parameters:
    - theta1: angle of the first joint (in radians)
    - theta2: angle of the second joint (in radians)
    - L1: length of the first link
    - L2: length of the second link
    
    Returns:
    - (x, y): A tuple containing the x and y coordinates of the end-effector
    """
    import math
    
    x = L1 * math.cos(theta1) + L2 * math.cos(theta1 + theta2)
    y = L1 * math.sin(theta1) + L2 * math.sin(theta1 + theta2)
    
    return (x, y)

# Example usage:
if __name__ == "__main__":
    # Let's assume each link is 1 meter long:
    L1, L2 = 1.0, 1.0
    
    # Test the function with some angle values (in radians)
    angles = [
        (0.0, 0.0),
        (math.pi/4, math.pi/4),
        (math.pi/2, 0.0),
        (math.pi/3, -math.pi/6)
    ]
    
    for (t1, t2) in angles:
        x, y = forward_kinematics_2link(t1, t2, L1, L2)
        print(f"Theta1={t1:.2f}, Theta2={t2:.2f} => (x={x:.2f}, y={y:.2f})")
```


## Key Definitions and Concepts in Kinematics

Below is a set of definitions and concepts that will help you navigate the topics in this chapter on Kinematics. Some are foundational from trigonometry, and others relate specifically to robotics and the modeling of mechanical structures. Feel free to reference these as you study.

### Degrees of Freedom (DoF)
The **number of degrees of freedom** is the number of independent variables (or coordinates) needed to define the configuration of a system.  
- *Example:* A free rigid body in 3D has 6 DoF (3 translational + 3 rotational).

#### Mobility of a Kinematic Structure  
Often denoted as \( MO \), mobility is equivalent to the total DoF of the structure. If you have \( n \) independent rigid bodies in free space (before assembling them with joints), they collectively have \( 6n \) DoF in 3D space (each body can move in 3 translational and 3 rotational dimensions).

---

### Types of Kinematic Chains and Mechanisms

#### Serial Chain  
A sequence of rigid links where each link is connected to the next by a joint, except for the first and last link, which each have only one connection.  
- *Example:* A typical robotic arm, where each segment is attached end-to-end.

#### Fully Parallel Mechanism  
A mechanism in which two links (often the base and the end-effector) are connected by multiple independent chains.  
- *Example:* The Delta robot, where the end-effector is connected to the base by several parallel arms.

#### Tree Structure  
A structure similar to a serial chain but can branch out. Each link can have multiple “child” links, forming a tree. A serial chain is a special case of a tree with no branching.

---

### Common Joint Types

- **Revolute (R)** — Rotational motion around a fixed axis (e.g., a hinge).  
- **Prismatic (P)** — Translational motion along a single axis (sliding joint).  
- **Helical (H)** — Combined rotation and translation along the same axis (like a screw).  
- **Cylindrical (C)** — A combination of one rotational DoF and one prismatic DoF about/along the same axis.  
- **Planar** — Allows motion in a plane, typically two translational DoF and one rotational DoF.  

---

### Homogeneous Transformations

#### Rotation/Translation Representation  

A **homogeneous transformation** matrix represents both rotation and translation in a $4\times4$ matrix form. For example, a rotation about the $z$-axis by an angle $ \Theta $ is given by:  

$$
\text{Rot}(z, \theta) = 
\begin{bmatrix}
    \cos \theta & -\sin \theta & 0 & 0 \\
    \sin \theta & \cos \theta  & 0 & 0 \\
    0           & 0            & 1 & 0 \\
    0           & 0            & 0 & 1
\end{bmatrix}
$$  

Homogeneous transformations are fundamental in describing the position and orientation of each link and the end-effector in robotics.

---

### Constraints in Robotic Mechanisms

#### Holonomic Constraints  
Constraints that can be written purely in terms of **position variables** (joint angles, link displacements). For instance, most standard joints (revolute, prismatic, etc.) impose constraints that do not require velocities or accelerations in the equations. The number of constraint equations is $6 - n$, where $ n $ is the DoF of the joint.

#### Nonholonomic Constraints  
Constraints that **cannot** be expressed solely in terms of the position variables. They involve **time derivatives** of those variables and cannot be integrated to yield a relationship only between the joint coordinates.  
- *Example:* The rolling constraints of wheeled mobile robots (no slipping/skidding).

---

<h2 id="forward-and-inverse-kinematics"> Forward and Inverse Kinematics:

#### Direct (Forward) Geometric Model (DGM)  
Also called **forward kinematics**, it provides the **position and orientation** of the robot’s end-effector as a function of the robot’s joint variables $ \Theta $. Formally:

$$
\mathbf{T}_{\text{end-effector}} = f(\Theta)
$$

where $ \Theta $ can include both rotational and prismatic joint variables.

- **Serial Robots**  
  For serial robots, the DGM generally has **a single unique solution** for a given set of joint variables (i.e., one specific end-effector pose).

- **Parallel Robots**  
  For parallel robots, the DGM can have **multiple solutions** (often called “contortions”) for a given set of joint variables.

#### Inverse Geometric Model (IGM)  
Also called **inverse kinematics**, it is the inverse problem: given a desired position and orientation of the end-effector, find the **joint variables** that achieve it. Formally:

$$
\Theta = f^{-1}(\mathbf{T}_{\text{desired}})
$$

This can have multiple solutions (or no solutions) depending on the robot’s geometry.

- **Serial Robots**  
  The IGM for serial robots may have **several solutions** or sometimes no solution at all, depending on the desired pose.

- **Parallel Robots**  
  The IGM for parallel robots typically has **a single unique solution**, in contrast to serial mechanisms.

#### Jacobian  
The **Jacobian matrix** describes how a small change in the joint variables translates to a change in the end-effector’s **velocity** (or differential displacement). It is crucial for understanding robot motion, detecting singularities, and implementing control algorithms.

---

### Additional Useful Terms 

- **Workspace** — The set of all points (and orientations) that the end-effector can reach. It can be subdivided into the **reachable workspace** (positions the end-effector can physically attain) and the **dexterous workspace** (positions the end-effector can reach with all orientations).
- **Singularity** — A configuration where the robot loses certain motion capabilities (the Jacobian becomes rank-deficient). In these positions, small changes in joint angles can result in large or unpredictable changes in the end-effector pose—or no movement in certain directions at all.

---

## Useful Formulas for Robotic Kinematics

### Grubler’s Formula (General Form in 3D)

Also known as Kutzbach criterion, it gives the mobility $ MO $ of a mechanism with $ n $ rigid bodies connected by $ k $ joints:

$$
MO = 6 \times (n - k) + \sum_{i=1}^{k} (\text{MO}_i),
$$

where $\text{MO}_i$ is the contribution to mobility from the $ i $-th joint (often the joint’s DoF).

> **Note:** Variations of this formula exist depending on whether you consider closed chains, higher-pair joints, and other special constraints.

---

### Rotation Matrices About Principal Axes
- **Rotation about the x-axis by $\alpha$**  

    $$
    R_x(\alpha) = 
    \begin{bmatrix}
        1 & 0 & 0 \\
        0 & \cos \alpha & -\sin \alpha \\
        0 & \sin \alpha & \cos \alpha
    \end{bmatrix}
    $$

- **Rotation about the y-axis by $\beta$**  

    $$
    R_y(\beta) = 
    \begin{bmatrix}
        \cos \beta & 0 & \sin \beta \\
        0 & 1 & 0 \\
        -\sin \beta & 0 & \cos \beta
    \end{bmatrix}
    $$

- **Rotation about the z-axis by $\gamma$**  

    $$
    R_z(\gamma) = 
    \begin{bmatrix}
        \cos \gamma & -\sin \gamma & 0 \\
        \sin \gamma & \cos \gamma & 0 \\
        0 & 0 & 1
    \end{bmatrix}
    $$

Any 3D rotation can be expressed as a product of these fundamental rotations.


Quaternions provide a non-singular way to interpolate and compute 3D orientations, often used in control and simulation.


## Ressources

### Books

- [Springer Handbook of Robotics ](https://link.springer.com/chapter/10.1007/978-3-319-32552-1_2) (Chapter 2. Kinematics)

- [Robotic Manipulation](https://manipulation.csail.mit.edu/pick.html) (Chapter 3. Basic Pick and Place)

### Videos

- [Introduction to Robotics: Kinematics & Modeling](https://www.youtube.com/watch?v=K_xIJBlbjg4&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA) (Youtube Channel by Mohammad Zainullah Khan)

- [Robotic Manipulation](https://www.youtube.com/watch?v=ZOXp_wixIzo&list=PLkx8KyIQkMfVRPReg9FHtBk_RGEwnVxU-&index=3) (MIT 2020)

---

[Back to Top](#start)