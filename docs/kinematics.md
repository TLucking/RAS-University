---
title: Kinematics
parent: Courses
layout: default
math: mathjax
---
# Kinematics

- Table of Contents
{:toc}

## Motivation

![Delta Robot Pick and Place](https://www.youtube.com/watch?v=8j5hPlHTZI8)

Have you ever watched a precision robot—like the Delta robot in the video—pick and place objects at incredible speed and accuracy? These agile machines seem are well known for their fluidity and precision. But behind the impressive motion lies a well-structured branch of mechanics called **kinematics**.

Kinematics, often referred to as the “**geometry of movement**,” is the study of *how bodies move in space without considering the forces or torques causing the motion*. By focusing on the geometry and arrangement of joints, links, and end-effectors, kinematics allows us to:

- Predict and Control Robot Positions: From assembly lines to surgical suites, robots must position their end-effectors at **exact points in space**. Kinematics equations provide the road map, telling us how each joint angle translates into a specific position and orientation.

- Design Efficient Mechanisms: Whether it’s a Delta robot on a factory floor or a humanoid robot in a research lab, well-planned kinematic structures enable robots to work **faster**, with better range of motion and fewer mechanical constraints.

- Streamline Path Planning: From pick-and-place tasks to drawing complex shapes, kinematics helps in **calculating paths**, ensuring the robot can move smoothly from one point to another without collisions or awkward joint motions.

In this chapter, you’ll explore different ways of representing positions and orientations in 3D space, understand the kinematics behind common robotic joints, and learn a systematic way to map your robot’s geometry into the equations that bring the entire mechanism to life. By mastering kinematics, you’ll have a strong foundation for making robots move **precisely** and **reliably**, unlocking a world of innovative possibilities.

## Ressources

### Books

- [Springer Handbook of Robotics ](https://link.springer.com/chapter/10.1007/978-3-319-32552-1_2) (Chapter 2. Kinematics)

- [Robotic Manipulation](https://manipulation.csail.mit.edu/pick.html) (Chapter 3. Basic Pick and Place)

### Videos

- [Introduction to Robotics: Kinematics & Modeling](https://www.youtube.com/watch?v=K_xIJBlbjg4&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA) (Youtube Channel by Mohammad Zainullah Khan)

- [Robotic Manipulation](https://www.youtube.com/watch?v=ZOXp_wixIzo&list=PLkx8KyIQkMfVRPReg9FHtBk_RGEwnVxU-&index=3) (MIT 2020)

### Free Online Courses

## Chapter 0 : Introduction to Robotics | Kinematics & Modeling

![Robotics 101: Full course for beginners](https://www.youtube.com/watch?v=K_xIJBlbjg4&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA)

## Chapter 1: Coordinate Transformations in 2D | Mapping {#chapter-1-coordinate-transformations-in-2D}

![Coordinate Transformations in 2D : Mapping](https://www.youtube.com/watch?v=H_94DTWd8ck&list=PL1YrgW7ROFofBqPGiWAmTqIwDc5SrzZrA&index=2)

## Exercises

### Pen & Paper Exercises

### Coding Exercises

## Corrections

## Key Definitions and Concepts in Kinematics

Below is a set of definitions and concepts that will help you navigate the topics in this chapter on Kinematics. Some are foundational from trigonometry, and others relate specifically to robotics and the modeling of mechanical structures. Feel free to reference these as you study.

### Degrees of Freedom (DoF)

#### Definition  
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

### Forward and Inverse Kinematics

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
  R_x(\alpha) = \begin{bmatrix}
  1 & 0 & 0 \\
  0 & \cos \alpha & -\sin \alpha \\
  0 & \sin \alpha & \cos \alpha
  \end{bmatrix}
  $$

- **Rotation about the y-axis by $\beta$**  

  $$
  R_y(\beta) = \begin{bmatrix}
  \cos \beta & 0 & \sin \beta \\
  0 & 1 & 0 \\
  -\sin \beta & 0 & \cos \beta
  \end{bmatrix}
  $$

- **Rotation about the z-axis by $\gamma$**  

  $$
  R_z(\gamma) = \begin{bmatrix}
  \cos \gamma & -\sin \gamma & 0 \\
  \sin \gamma & \cos \gamma & 0 \\
  0 & 0 & 1
  \end{bmatrix}
  $$

Any 3D rotation can be expressed as a product of these fundamental rotations.


Quaternions provide a non-singular way to interpolate and compute 3D orientations, often used in control and simulation.

---

[Back to Top](#start)