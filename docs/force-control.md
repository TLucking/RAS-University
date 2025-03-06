---
title: Force control
parent: Courses
layout: default
math: mathjax
---
# Force control {#start}

- Table of Contents
{:toc}



### Books

- [Springer Handbook of Robotics ](https://link.springer.com/chapter/10.1007/978-3-319-32552-1_9) (Chapter 9. Force Control)

- [Robotic Manipulation](https://manipulation.csail.mit.edu/force.html) (Chapter 8. Manipulator Control)

- [OpenTextBooks](https://opentextbooks.clemson.edu/me8930/chapter/force-control-of-a-manipulator/)

## Motivation

In motion control problems, the goal is to move the manipulator to the desired trajectory by following a specified trajectory. A simple example of this would be the transportation of an object from one location to another. While the premise of motion control might be basic in nature, it is a fundamental part of any higher-level robot manipulation. On the other hand, force control becomes mandatory for a robot to successfully carry out its task when interacting with its environment. Force control becomes essential whenever a robot end-effector makes contact with surfaces or objects, ensuring that the contact force is maintained at a desired level rather than unconstrained (which could lead to excessive force or loss of contact)​. A force control strategy modifies the robot joint position/torque based on force/torque sensors for the wrist, joints, and hands of the robot.
That’s why In the recent decade, research with robot force control has been increasing with an increasing number of use cases in medical, occupational, construction, and many other industries. Typically, any task that involves robot interaction with an environment such as polishing, cutting, scraping, pick-and-place, welding, etc. can benefit from the use of different methods of force control strategies. Another field where force control has a major role to play, and potentially have a big impact is physical human robot interaction. This typically involves a robot working in synchronous to the human where the robot measures the motion or forces from human and correspondingly responds to complete a desired task.

- [Intuition](https://www.youtube.com/watch?v=8VB5NneTKLE) (First 10mn) --> not needed anymore I think
- [Overview](https://youtu.be/mGuDXlZEoSc)(Kevin Lynch 11.1)

### Conceptual exercise
*List some real-world tasks where pure motion control would fail and force control is required. Describe what would go wrong without force feedback.*
- Peg-in-hole assembly – without force control, the peg might jam or break if misaligned; force control lets the robot feel contact and adjust insertion force to guide it in. 
- Surface polishing – a position-only robot might either press too hard (damaging the surface/tool) or too lightly (ineffective polishing); force control maintains a consistent polishing pressure. 
- Human handshaking robot – purely position-controlled handshake could crush the person’s hand or miss it entirely, whereas force control allows gentle, adaptive gripping. 

→ force control prevents excessive force and adapts to uncertainties in contact


## Chapter 1 : Passive and Active Interaction Control
Two broad paradigms exist: passive versus active interaction control:
* Passive interaction control: the trajectory of the end-effector is driven by the interaction forces due to the inherent nature or compliance of the robot (i.e., internally, such as joints, servo, joints, etc.). In passive control, the end-effector’s motion naturally deflects under force, as in soft robots – but this lacks flexibility (every specific task might require a special end-effector to be designed and it can also have position and orientation deviations)​ and high contact forces could occur because there is no force force measurement. 

    ![Illustrative Video](https://youtu.be/4fnPVRWWEU8)

* Active interaction control: uses sensors (e.g. force/torque sensors) and feedback controllers to measure interaction forces and adjust accordingly the robot’s commands in terms of trajectory or object manipulation.  Active control can react to forces in real-time, providing flexibility and accuracy at the cost of added complexity and speed limitations. To obtain a reasonable task execution speed and disturbance rejection capability, active interaction control has to be used in combination with some degree of passive compliance. Active interaction control can be further grouped into indirect (such as admittance and impedance control) and direct force control strategies (such as hybrid force/motion control).
    
    ![Illustrative video](https://www.youtube.com/watch?v=7Nvlki1xo-c)	

**Conceptual exercise**

*What is the difference between passive and active interaction control?*
* Active Interaction Control: This type of control involves actively applying forces/moments to manipulate the environment. This type of control may make use of sensors, feedback controls to generate forces/moments that is appropriate. It is commonly used in tasks that require precision control like assembly, manipulation and where the robot has to actively push, grasp or move objects in the environment.
* Passive Interaction Control: It involves designing the robot or its end-effector to be compliant to external forces. Instead of active force application, mechanical design or the compliance of the robot allows it to naturally respond to external forces. Compliant materials such as springs, soft materials can be used for such use. By passive absorption or by dampening external forces safe and adaptive interaction with the environment is enabled. This type of control is common where human robot interaction is involved and sometimes it is used in combination with active based control.

| **Passive interaction control** | **Active interaction control** |
|---------------------------------|--------------------------------|
| don’t “sense” or adjust – they just deform | requires the measurement of the contact force and moment |
| Simpler and cheap | involve feedback to a stable controller in order to deliberately adjust force |
| Limited to its design characteristics | more precise and versatile (you can program different force targets) |
| the preprogrammed trajectory of the end-effector must not be changed at execution time → can only deal with small position and orientation deviations of the programmed trajectory | More expensive |
| Fast | Slower |
| it can not guarantee that high contact forces will never occur. |  |


## Chapter 2: Indirect and Direct Force Control
Active interaction control strategies can be grouped into two categories: those performing indirect force control and those performing direct force control. The main difference between the two categories is that the former achieve force control via motion control, without explicit closure of a force feedback loop; the latter instead offer the possibility of controlling the contact force and moment to a desired value, thanks to the closure of a force feedback loop




### Chapter 2.1 : Indirect Force Control

Indirect force control strategies achieve force regulation without directly commanding forces; instead, they modulate the robot’s motion behavior (position or velocity) in response to contact. The robot is programmed to act like a (simple) mechanical system that reacts to contact forces in a desired way. Imagine we were to walk up and push on the end-effector of the iiwa. With only knowledge of the parameters of the robot itself (not the environment), we can write a controller so that when we push on the end-effector, the end-effector pushes back (using the entire robot) as if you were pushing on, for instance, a simple spring-mass-damper system. Rather than attempting to achieve manipulation by moving the end-effector rigidly through a series of position commands, we can move the set points (and perhaps stiffness) of a soft virtual spring, and allow this virtual spring to generate our desired contact forces. 

This approach can also have nice advantages for guaranteeing that your robot won't go unstable even in the face of unmodeled contact interactions. If the robot acts like a dissipative system and the environment is a dissipative system, then the entire system will be stable.

Indirect forced control can be further classified as Impedance control if the robot responds by generating forces (i.e., through joint moment(s) and/or force(s)) or Admittance control if the robot responds by imposing a deviation from desired trajectory as a result of interaction with the environment.

### Chapter 2.1.1 : Impedance control
In principle, the fundamental idea builds from the fact that 
mechanical impedance is a measure of how a structure resists motion when it is 
subjected to a force [18]. As described before, using impedance control results in 
generating forces through joint moment/force(s) based on interaction with the 
environment described by equation 3.1 where *F* is the force, *Z* is the impedance, and 
*v* is the velocity.

$$
F = Zv \tag{3.1}
$$

$$
F = ma \tag{3.2}
$$

$$
F = kx \tag{3.3}
$$

$$
F = -cv \tag{3.4}
$$

The robotic system is then modeled as an equivalent system with mass, spring, and 
damper [11]. The one where its parameters such as mass, spring constant, and damping 
coefficient can be adjusted as required to adapt to the interaction with the 
environment [8, 9]. For the first part, force and mass relation can be given by 
Equation (3.2) where *m* is the mass and *a* is the acceleration. For a certain force on an object, it accelerates corresponding to the mass of the object. Second part, according to Hooke’s law given by Equation (3.3) where *k* is the stiffness and *x* is the displacement, for a certain force on a spring, it displaces corresponding to the stiffness. And for the last part, given by Equation (3.4) where *c* is the damping coefficient and *v* is the velocity of the object. The faster the velocity of an object for a given damping coefficient more force is required [25].

Considering a mechanical system described by Figure 3.3 and 3.4 based on \cite{1},

$$
    m\ddot{x} + b\dot{x} + kx = u + f_e \tag{3.5}
$$ 

where $x$ is the position of the system with mass ($m$), damping coefficient ($b$), stiffness ($k$), input control ($u$) and interaction force ($f_e$). Input control equations are given in 3.7.

![fig3.3]({{ site.baseurl }}/assets/images/Force/impedance_1.png)(Fig 3.3 Diagram to describe impedance control)

![fig3.4]({{ site.baseurl }}/assets/images/Force/impedance_2.png)(Fig 3.4 Mechanical system in contact with the environment)

Created by Rahul Narasimhan Raghuraman based on information from [1]


Here, $x_e$ describes the position of the environment, $x_r$ represents the trajectory. Position error is given by the difference between $x$ (current position) and the reference ($x_r$) \cite{1}.

$$
    u = (b - mm_d^{-1}b_d)\dot{x} + (k - mm_d^{-1}k_d)x - (1 - mm_d^{-1})f_e + mm_d^{-1}(b_d\dot{x}_r + k_dx_r) + m\dot{x}_r \tag{3.6}
$$ 

$$
    u = (b - b_d)\dot{x} + (k - k_d)x + (b_d\dot{x}_r + k_dx_r) + m\dot{x}_r
$$

Since the robot is described as a combination of mass, spring, and damper, the equation for the desired trajectory is given by Equation (3.7) and Figure 3.5 illustrates an example of an application.

$$
    m_d(\ddot{x} - \ddot{x}_r) + b_d(\dot{x} - \dot{x}_r) + k_d(x - x_r) = f_e \tag{3.7}
$$

where $m_d$, $b_d$, and $k_d$ are the impedance coefficients for the controller (Al-Shuka et al. 2018).

![fig3.5]({{ site.baseurl }}/assets/images/Force/impedance_3.png)(Fig 3.5. A robotic manipulator in contact with the environment using impedance control principle)

Hence, by controlling the impedance of the robot we can manipulate the behavior of the end-effector depending on the interaction with the environment. For example, we can set very low impedance (or high compliance) and make it act like a very loose spring or we can set the stiffness very high where the robot would only move to the desired position without much oscillation.

![Illustrative example 1](https://youtu.be/KJ8s1BUHoks)
![Illustrative example 2](https://www.youtube.com/watch?v=WS1gSRcJbJQ)

Through impedance control, it is possible to achieve a desired dynamic behaviour. A subset of this task is to achieve a static behaviour. The approach consists in assigning a desired position and orientation and a suitable static relationship between the deviation of the end-effector position and orientation from the desired motion and the force exerted on the environment.  This is done by acting on the elements of K (stiffness) → **Stiffness control** 
Stiffness control allows to keep the interaction force and moment limited at the expense of the end-effector position and orientation error, with a proper choice of the stiffness matrix, without the need of a force/torque sensor. However, in the presence of disturbances (e.g., joint friction) which can be modeled as an equivalent end-effector wrench, the adoption of low values for the active stiffness may produce large deviations with respect to the desired end-effector position and orientation, also in the absence of interaction with the environment. 

![Illustrative example](https://www.youtube.com/watch?v=pXH7rwrzh6s)

### Chapter 2.1.2: Admittance control
It is conceptually the dual of impedance. In admittance control, the robot (or its controller) monitors the forces and adjusts the motion commands in response​. Instead of directly outputting a force for a given motion error, an admittance controller takes a measured force input and yields a position or velocity adjustment. Practically, the robot is typically position-controlled at its core, but an outer loop takes the force error and computes a small shift in the commanded position (or trajectory) to relieve or accommodate that force​. For instance, if a force of 10 N is pushing the robot off its path, an admittance controller might say “yield by 1 mm” (depending on a compliance setting) – effectively, the robot moves slightly until the force reduces. 
Admittance control often involves two loops: an inner high-bandwidth control loop where the compliant velocity/position is controlled, and an outer force loop that modifies the target position based on force input.

![fig3.6]({{ site.baseurl }}/assets/images/Force/admittance_1.png)(Fig 3.6. Diagram to describe admittance control)
Created by Rahul Narasimhan Raghuraman based on information from [4]

For a similar example as described before (see Fig. 3.7) but with an additional reference trajectory to use and command the manipulator, xc.

![fig3.7]({{ site.baseurl }}/assets/images/Force/admittance_2.png)(Figure 3.7. System in contact with environment to show changes in target dynamics due to the commanded trajectory xc)
Created by Rahul Narasimhan Raghuraman based on information from [4]

Based on this, the outer admittance filter is described by Equation (3.8) as –

$$
    m_d(\ddot{x}_c - \ddot{x}_r) + b_d(\dot{x}_c - \dot{x}_r) + k_d(x_c - x_r) = f_e \tag{3.8}
$$

$$
    m_d(\ddot{x}_c) + b_d(\dot{x}_c - \dot{x}_r) + k_d(x_c - x_r) = f_e
$$

$$
    m_d(\ddot{x}_c) + b_d(\dot{x}_c) + k_d(x_c - x_r) = f_e 
$$


And the inner position control can be expressed using PID (proportional, integral, and derivative) control methods as shown by Equation (3.9) \cite{4}.

$$
    k_p(x_c - x) + k_v(\dot{x}_c - \dot{x}_r) \tag{3.9}
$$

Here, \( k_p \) and \( k_v \) are the gains of feedback.

![Illustrative example](https://www.youtube.com/watch?v=JRbAesam-EE)

Both impedance and admittance achieve force indirectly by shaping how the robot responds to contact. They can be used to make a robot compliant without sacrificing stability. However, they have different practical considerations: for example, admittance control assumes a very stiff inner position control (common in industrial arms) and adjusts commands externally, which works well when you can trust the position control to execute quickly​. Impedance control embeds compliance in the low-level control (joint torques), which can be more direct but may face stability issues if the environment is very stiff and the controller is also stiff​. In summary, indirect force control lets the robot simulate a mechanical behavior (softness or stiffness) to handle contact forces gracefully, rather than directly pushing or pulling with a specified force.

**Recap videos**

![Summary Video](https://www.youtube.com/watch?v=Vz5c3il0Dys) --> Very great video from Polytech Montreal (POLAR lab), summarizing the principles of indirect force control in 7mn

![Videos to go deeper in the theory](https://www.youtube.com/watch?v=IolG5V_skv8)(Robotics 2 - Impedance Control) --> Longer video (1h) from Universita di Roma, very serious and official

**Conceptual exercise**

*What is the difference between traditional position control with a PD controller and joint-stiffness control?*

The difference in the algebra is quite small. A PD control would typically have the form $$u=K_p(q_d-q) +
      K_d(\dot{q}_d - \dot{q}),$$
whereas stiffness control is $$u = -\tau_g(q)
      + K_p(q_d-q) + K_d(\dot{q}_d - \dot{q}).$$
In other words, stiffness control tries to cancel out the gravity and any other estimated terms, like friction, in the model. As written, this obviously requires an estimated model (which we have for iiwa, but don't believe we have for most arms with large gear-ratio transmissions) and torque control. But this small difference in the algebra can make a profound difference in practice. The controller is no longer depending on error to achieve the joint position in steady state. As such we can turn the gains way down, and in practice have a much more compliant response while still achieving good tracking when there are no external torques.

**Programming Exercise**

[2.1 Programming Exercise : Impedance controller](https://learningadaptivereactiverobotcontrol.github.io/book-website.io//documentation/L9-Impedance.html)

### Chapter 2.2: Direct Force Control

Direct force control uses explicit control based on the interaction with the environment and based on the interaction and contact force, the force at joint(s) of the robot can be controlled so as to complete the task.

Consider a 1-DOF, linear, position-controlled robot as in the figure below. One would like to control the contact force \( f \) between the robot end-effector and the wall so as to track a reference \( f_{ref} \), where \( f_{ref} \) is, for example, a constant positive value.
![direct_1]({{ site.baseurl }}/assets/images/Force/direct_1.png)(Contact interaction between a one-dof robot and a wall.)

For that, one can use a Proportional-Derivative (PD) control law as below. Note that the command sent to the robot is \( x_{com} \), which is a desired position.
![direct_2]({{ site.baseurl }}/assets/images/Force/direct_2.png)(Block diagram of a force controller to control the contact force between the robot end-effector and the environment. The Laplace variable s stands for differentiation with respect to time (d/dt).)


The Force/Torque (F/T) sensor measures the contact force between the end-effector and the wall. When there is no contact (first figure, top sketch), the contact force is zero, thus $f_{sensed} = 0$ yielding $f_{err} > 0.$

Assuming stationary initial conditions, one has next $x_{err} > 0,$ which implies that $x_{com} > x_{cur},$ which in turn makes the robot move to the right, towards the wall.

Upon contact between the robot end-effector and the wall (first figure, bottom sketch), the contact force sensed by the F/T sensor 
$ f_{sensed} $ becomes positive, but initially smaller than $f_{ref}$ — assuming "soft" collision. Therefore, initially, one still has  $x_{com} > x_{cur} = x_{wall},$ meaning that the robot is commanded to penetrate the wall.

Finally, interactions between the PD controller and the stiffness of the end-effector, of the wall, and of the robot's internal position controller (characterized in part by its own PID gains), will eventually lead to a stationary state where $f_{err} = 0$ and $x_{com} > x_{wall}$ (so as to ensure a positive contact force).

But in general, the task complexity is much higher where we may have to provide a model to specify desired motion and contact force/moment corresponding to the constraints imparted by the environment on the robot. Typical strategy to work with such type of control system is hybrid force/motion control that generates motion in directions that are unconstrained and force/moment in task direction that are constrained


Pose estimation is the process of determining the position and orientation (pose) of a camera or object relative to a known reference frame, typically using 2D images and 3D world points. It plays a crucial role in robotics, augmented reality, and computer vision applications like object tracking, autonomous navigation, and grasping.

### Chapter 2.2.1: Hybrid Force Control
![Intuition](https://www.youtube.com/watch?v=BXu9C3joUSk)	

The aim of hybrid force/motion control is to split up simultaneous control of both end-effector motion and contact forces into two separate decoupled subproblems
[Controller](https://rocco.faculty.polimi.it/cir/Control%20of%20the%20interaction.pdf)(P 38)

The idea is to separate all 6 axes of the task (3 force and 3 torque) and apply either a motion based control or a force based control onto each of the axes. Unconstrained (free) axes are controlled in position while constrained axes are controlled by applying a constant force 

An example setup shown in Figure 3.10 can be used to demonstrate the principle of hybrid motion/force control (osrobotics.org). Imagine a table and a multi DOF robot that comes in contact with the surface and then proceeds to have a sliding motion. These types of tasks are very common in grinding, polishing kind of jobs in industries [26]. Here the contact force is being controlled in the Z direction while keeping the motion in X direction using a PD controller and a force sensor attached to the end-effector of the robot.

![Fig3.10]({{ site.baseurl }}/assets/images/Force/hybrid_1.png)(Figure 3.10. End-effector sliding and corresponding block diagram to control normal contact force in Z and position in X.)


The basic model can be given by the concept that connects constraints for doing a task that requires force feedback to control design. $\{C\}$ is the constraint coordinate system and transformation form $\{C\}$ is given such that for controlling one manipulator joint involves every dimension in $\{C\}$:

$$ q_i = f_i^{-1}(x_1, x_2, \ldots, x_N) \tag{3.10} $$

where, $q_i$ is the $i$ th joint position of manipulator, $f^{-1}$ is the inverse kinematic function and $x_j$ is the position of $j$ th degree of freedom in $\{C\}$.

A binary selection vector $s$ is often used, where an element $s_i = 1$ might indicate “force control in that DOF” and 0 indicates “position control” (or vice versa, depending on convention). The controller is then designed to enforce $$s_i(F_j - F_{d,j}) + (1 - s_i)(x_j - x_{d,j}) = 0$$.

This means: if $s_j = 1$ (force-controlled axis), track the desired force $F_{d,j}$ (let position adjust as needed), and if $s_j = 0$ (position-controlled axis), track the desired position $x_{d,j}$ (while allowing whatever force arises).

![Illustrative example](https://www.youtube.com/watch?v=R2zwEaxyhY0)

Hybrid position/force control is based on a nominal model of the interaction. Inconsistency
may however occur in the measurements, due e.g. to:
1. friction at the contact (a force is detected in a nominally free direction)
2. compliance in the robot structure and/or at the contact (a displacement is detected in a
direction which is nominally constrained in motion)
3. uncertainty in the environment geometry at the contact

![Hybrid motion/force control](https://youtu.be/UR0GpaaBVKk?si=_8KyDB-Hhl7YSeX9) --> A short video explaining in more mathematical terms what was presented in this section

![Video to go deeper into theory](https://www.youtube.com/watch?v=TyzTkIbWPyQ) --> This is a much longer video but very interesting and didactic

**Exercise**

[Hybrid Force/Position control Assignment](https://deepnote.com/workspace/Manipulation-ac8201a1-470a-4c77-afd0-2cc45bc229ff/project/87d8044f-3eb2-4f25-b52f-f51a5eca68b7/notebook/hybridforceposition-25104d02b7bc429bb3d71ef7e5d1c2bb)
This is an assignment given in the [Robotic Manipulation course](https://manipulation.csail.mit.edu/force.html#example2) given in MIT. It uses Python with a custom library that can be easily installed on mac or Ubuntu ```pip install manipulation``` or directly executing in DeepNote.
It comprises conceptual exercises as well as programming. The only problem is that a solution is not provided. 

![Hybrid_assignment]({{ site.baseurl }}/assets/images/Force/hybrid_assignment.png)

# Summary
A simulation summarizing the different types of force control presented here 
using ROS and on Linux (code hard to understand but a readme helps to run the simulation) ???
[simulation](https://github.com/MingshanHe/Compliant-Control-and-Application/tree/noetic)

[More theory](https://ocw.mit.edu/courses/2-12-introduction-to-robotics-fall-2005/127c560e6052cb02ed3f7adc8d3c1512_chapter9.pdf#:~:text=accommodate%20the%20pressure%20with%20which,former%20is%20x%20and%20y) 
--> a complete university course in PDF from MIT

# Final Project
[Complete project with hardware and software implementation in python](https://github.com/SamoaChen/2-Linkages-Robotic-Arm-Hybrid-Position-Force-Control/tree/master)

### Free Online Courses

- [Lecture 13 - MIT 6.881 (Robotic Manipulation), Fall 2020 - Force Control (part 2)](https://www.youtube.com/watch?v=WX03NqnKVywl)




[Back to Top](#start)