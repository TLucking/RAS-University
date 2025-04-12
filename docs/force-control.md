---
title: Force control
parent: Courses
layout: default
math: mathjax
---
<!-- Link external JavaScript file -->
<script src="questions.js"></script>

# Force control {#start}

- Table of Contents
{:toc}



### Books

- [Springer Handbook of Robotics ](https://link.springer.com/chapter/10.1007/978-3-319-32552-1_9) (Chapter 9. Force Control)

- [Robotic Manipulation](https://manipulation.csail.mit.edu/force.html) (Chapter 8. Manipulator Control)

- [OpenTextBooks](https://opentextbooks.clemson.edu/me8930/chapter/force-control-of-a-manipulator/)

## Prerequisites
* Basic knowledge of robotics kinematics and dynamics
* Control theory..............

## Motivation
![Overview](https://youtu.be/mGuDXlZEoSc)

In **motion control** problems, the robot's objective is to follow a predefined trajectory as accurately as possible — regardless of contact with the environment. This is suitable for free-space movements where external forces are negligible or undesirable. While the premise of motion control might be basic in nature, it is a fundamental part of any higher-level robot manipulation. 

However, motion control alone is not sufficient when a robot physically interacts with its environment. Indeed unregulated contact can cause slippage, loss of contact, damage and excessive force.  This is where **force control** becomes essential: it ensures that the robot applies and regulates the desired amount of force during contact, making the interaction both safe and effective. A force control strategy modifies the robot's joint positions or torques to account for interaction forces at the end-effector.

This is why, in the past decade, research in robot force control has increased significantly, with applications across medical, industrial and service robotics. In industrial robotics, typical tasks that involves robot interaction with an environment such as polishing, cutting, scraping, pick-and-place, welding, etc. can benefit from the use of different methods of force control strategies. 
Another particularly impactful area is physical human-robot interaction, where the robot must respond to human-applied forces and work in synchrony. In these scenarios, force control enables safe, adaptive and cooperative behavior in shared tasks.




<details markdown="1">
<summary><strong>Conceptual Exercise</strong></summary>
**Drag each task to the correct category:**

<style>
  .drag-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 16px;
  }

  .drop-zone {
    border: 2px dashed #ccc;
    border-radius: 6px;
    padding: 10px;
    min-height: 175px;
    width: 45%;
    background-color: #f9f9f9;
  }

  .drag-item {
    background-color: #e3e3e3;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: move;
    user-select: none;
    margin: 4px;
  }

  .check-button {
    margin-top: 10px;
    padding: 8px 12px;
    cursor: pointer;
  }

  .feedback {
    margin-top: 10px;
    font-weight: bold;
  }
</style>

<div class="drag-container">
  
  <!-- Serial Robot Zone -->
  <div class="drop-zone" id="motion-zone" ondrop="drop(event)" ondragover="allowDrop(event)">
    <h3>Motion Control</h3>
  </div>

  <!-- Parallel Robot Zone -->
  <div class="drop-zone" id="force_zone" ondrop="drop(event)" ondragover="allowDrop(event)">
    <h3> Force Control</h3>
  </div>
</div>

<!-- Draggable items -->
<div class="drag-container" id="drag-items">
  <div class="drag-item" id="pick_place" draggable="true" ondragstart="drag(event)">Pick-and-place in free space</div>    <div class="drag-item" id="Peg_in_hole" draggable="true" ondragstart="drag(event)">Peg-in-hole assembly</div>
  <div class="drag-item" id="Wiping" draggable="true" ondragstart="drag(event)">Wiping a window</div>
  <div class="drag-item" id="3D_print" draggable="true" ondragstart="drag(event)">3D printing</div>
  <div class="drag-item" id="Drone" draggable="true" ondragstart="drag(event)">Flying a drone for inspection</div>
  <div class="drag-item" id="Polishing" draggable="true" ondragstart="drag(event)">Surface polishing</div>
  <div class="drag-item" id="hand_shaking" draggable="true" ondragstart="drag(event)">Human handshaking robot </div>
</div>

<script>
const correctMapping = {
  "motion-zone": ["pick_place", "3D_print", "Drone"],
  "force_zone": ["Peg_in_hole", "Polishing", "hand_shaking", "Wiping"]
};
</script>

<!-- Trigger + Feedback -->
<button class="check-button" onclick="checkDragDropAnswer(correctMapping, 'feedback-drag')">Check Answer</button>
<div class="feedback" id="feedback-drag"></div>


<details markdown ="1">
  <summary><strong>Detailed answer</strong></summary>

  * **Force control :**
    - Peg-in-hole assembly : without force control, the peg might jam or break if misaligned; force control lets the robot feel contact and adjust insertion force to guide it in. 
    - Surface polishing : a position-only robot might either press too hard (damaging the surface/tool) or too lightly (ineffective polishing); force control maintains a consistent polishing pressure. 
    - Human handshaking robot : purely position-controlled handshake could crush the person’s hand or miss it entirely, whereas force control allows gentle, adaptive gripping. 
    - Wiping a table or window : Maintaining consistent contact pressure across a surface is difficult with pure motion control; uneven force leads to missed spots or excess wear.

  * **Motion control :**
    - Pick-and-place in free space : If there’s no contact with the environment during transit, motion control ensures fast, smooth, and precise movement.
    - 3D printing : The tool follows a precisely planned trajectory to deposit material. Contact with the environment is minimal and highly predictable.
    - Flying a drone for inspection : Drones typically avoid contact; path following through motion control is sufficient for inspection unless manipulation is involved.

  → Force control prevents excessive force and adapts to uncertainties in contact

</details>

</details>

## Chapter 1 : Interaction control overview
While motion control focuses on following a desired trajectory regardless of external contact, force control aims to regulate how much force is exchanged between the robot and its environment. This raises a fundamental question: how does the robot respond to forces during contact? There are two broad paradigms for addressing this:

* **Passive interaction control**: The trajectory of the end-effector is driven by the interaction forces due to the inherent nature or compliance of the robot (i.e., internally, such as joints, servo, joints, etc.). In passive control, the end-effector’s motion naturally deflects under force, as in soft robots. But, this lacks flexibility (every specific task might require a special end-effector to be designed and it can also have position and orientation deviations)​ and high contact forces could occur because there is no force measurement. 

    ![Illustrative Video](https://youtu.be/4fnPVRWWEU8)

* **Active interaction control**: It relies on sensors (e.g., force/torque sensors) and/or feedback controllers to measure interaction forces and adjust the robot’s commands accordingly—whether by modifying its trajectory or the way it manipulates objects. This approach enables real-time reactions to contact, offering high flexibility and accuracy. However, it comes with added complexity and limitations in speed. To achieve effective task execution and robust disturbance rejection, active control is typically combined with some degree of passive compliance. Active strategies can be futer divided into indirect methods (such as admittance and impedance control) and direct force control techniques (such as hybrid force/motion control).
    
    ![Illustrative video](https://www.youtube.com/watch?v=7Nvlki1xo-c)	

### Mathematical foundation
![Kevin Lynch](https://youtu.be/M1U629sREiY?si=De33y2G69TbPp6_q)

At a quasi-static level (i.e., for slow or stationary motions), the joint torques $\tau$ are related to the end-effector contact force $F_{\text{tip}}$ by the following fundamental equation:

$$
\tau = g(\theta) + J^T(\theta) F_{tip}
$$
where:

* $ g(\theta)$ is the vector of joint torques needed to counteract gravity at the configuration $\theta$.
* $ J(\theta) $ is the Jacobian matrix mapping velocities from joint space to end-effector space,
* $ F_{tip} $ is the force applied at the end-effector.

This relationship holds for both types of interaction control but the way it's used differs:
* In **passive interaction control**, $F_{\text{tip}}$ is imposed by the environment, and the resulting deflection of the robot depends on its intrinsic compliance.
* In **active interaction control**, the same equation becomes a control law. We specify a desired contact force $F_d$ and compute the torque needed to achieve it:
$$
\tau = \tilde{g}(\theta) + J^T(\theta) F_d
$$
 where $\tilde{g}(\theta)$ is a model of the gravitational torques.

 This is open-loop force control. It assumes the robot's model and the environment are accurate.  However, since models are never perfect, this approach is sensitive to disturbances or uncertainty. To increase robustness, we add feedback — typically with a PI controller:

$$
\tau = \tilde{g}(\theta) + J^T(\theta) \left( F_d + K_{fp}F_e + K_{fi} \int F_e\, dt \right)
$$
$$ 
F_e = F_d - F_{tip}
$$

This feedback formulation allows the robot to adjust its torques based on measured force errors, improving stability and accuracy even as the environment changes.

<details markdown = "1">
  <summary><strong>Conceptual exercise</strong></summary>
**What is the difference between passive and active interaction control?**

<style>
  .drag-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 16px;
  }

  .drop-zone {
    border: 2px dashed #ccc;
    border-radius: 6px;
    padding: 10px;
    min-height: 150px;
    width: 45%;
    background-color: #f9f9f9;
  }

  .drag-item {
    background-color: #e3e3e3;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: move;
    user-select: none;
    margin: 4px;
  }

  .check-button {
    margin-top: 10px;
    padding: 8px 12px;
    cursor: pointer;
  }

  .feedback {
    margin-top: 10px;
    font-weight: bold;
  }
</style>

<style>
  .drag-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 16px;
  }

  .drop-zone {
    border: 2px dashed #ccc;
    border-radius: 6px;
    padding: 10px;
    min-height: 175px;
    width: 45%;
    background-color: #f9f9f9;
  }

  .drag-item {
    background-color: #e3e3e3;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: move;
    user-select: none;
    margin: 4px;
  }

  .check-button {
    margin-top: 10px;
    padding: 8px 12px;
    cursor: pointer;
  }

  .feedback {
    margin-top: 10px;
    font-weight: bold;
  }
</style>

<div class="drag-container">
  
  <!-- Serial Robot Zone -->
  <div class="drop-zone" id="passive_zone" ondrop="drop(event)" ondragover="allowDrop(event)">
    <h3>Passive interaction control</h3>
  </div>

  <!-- Parallel Robot Zone -->
  <div class="drop-zone" id="active_zone" ondrop="drop(event)" ondragover="allowDrop(event)">
    <h3>Active interaction control</h3>
  </div>
</div>

<!-- Draggable items -->
<div class="drag-container" id="drag-items_passive_active">
 <div class="drag-item" id="item1" draggable="true" ondragstart="drag(event)">Does not measure force</div>
  <div class="drag-item" id="item2" draggable="true" ondragstart="drag(event)">Measures contact force and moment using sensors</div>
  <div class="drag-item" id="item3" draggable="true" ondragstart="drag(event)">Simple and inexpensive to implement</div>
  <div class="drag-item" id="item4" draggable="true" ondragstart="drag(event)">Uses feedback control to actively regulate force</div>
  <div class="drag-item" id="item5" draggable="true" ondragstart="drag(event)">Performance limited by mechanical design</div>
    <div class="drag-item" id="item9" draggable="true" ondragstart="drag(event)">Provides fast response but limited adaptability</div>

<div class="drag-item" id="item6" draggable="true" ondragstart="drag(event)">Can be programmed for precise and variable force outputs</div>
  <div class="drag-item" id="item7" draggable="true" ondragstart="drag(event)">Cannot adapt trajectory during execution; only tolerates small deviations</div>
  <div class="drag-item" id="deforms" draggable="true" ondragstart="drag(event)">Deforms passively under contact</div>
  <div class="drag-item" id="item11" draggable="true" ondragstart="drag(event)">Cannot guarantee prevention of high contact forces</div>

  <div class="drag-item" id="item8" draggable="true" ondragstart="drag(event)">Typically more complex and costly</div>
  <div class="drag-item" id="item10" draggable="true" ondragstart="drag(event)">Slower due to sensing and control computation</div>
</div>

<script>
const correctMapping2 = {
  "passive_zone": ["item1", "item3", "item5", "item7", "deforms", "item9", "item11"],
  "active_zone": ["item2", "item4", "item6", "item8", "item10"]
};
</script>

<!-- Trigger + Feedback -->
<button class="check-button" onclick="checkDragDropAnswer(correctMapping2, 'feedback-passive_active')">Check Answer</button>
<div class="feedback" id="feedback-passive_active"></div>


</details>

## Chapter 2: Active interaction control
Active interaction control strategies can be grouped into two categories: those performing indirect force control and those performing direct force control. The main difference is that indirect methods regulate interaction forces through motion behaviors — without explicitly closing a force feedback loop — whereas direct force control explicitly commands and tracks contact forces through sensor-based feedback.

### Chapter 2.1 : Indirect Force Control

Indirect force control strategies achieve force regulation by modulating the robot’s motion response rather than directly commanding forces. The robot behaves like a virtual mechanical system (typically a mass-spring-damper) so that when it is pushed, it responds with motion that generates restoring forces, just like a compliant structure would. 

In this approach, we are not controlling nor tracking the force directly. Instead, we are controlling how the robot moves when it encounters a force, which in turn determines the contact force. This behavior is what enables impedance and admittance control.

Imagine pressing on the end-effector of a robot. With only knowledge of the robot’s own parameters — not the properties of the environment, we can design a controller so that the robot responds as if you were pushing against a virtual spring-mass-damper system, not because it's tracking a specific force, but because its motion is governed by a virtual dynamic behavior that generates restoring forces naturally. Rather than rigidly following a trajectory, the controller modulates the system’s virtual dynamics (e.g., stiffness, damping) and lets the compliant behavior manage contact.

![Illustrative example 1](https://youtu.be/KJ8s1BUHoks)

This approach has powerful advantages:
- It provides intuitive and robust interaction with unknown environments.
- It is robust to modeling errors and external disturbances.
- If both the robot and the environment behave like passive (dissipative) systems, the overall interaction remains stable. 

<details markdown = "1">
<summary><em>Stability of passive systems</em></summary>
![Stability of passive systems](https://youtu.be/yFS5PSmlp6E)
If you're unfamiliar with what it means for a system to be passive, this short video offers a helpful intuition. The key point, lying between the *6:30* and *10:30mn*, is that a passive system can’t generate energy on its own, it can only dissipate or store it. In the context of force control, this matters because when two passive systems are connected through feedback, as is often the case when a robot interacts with its environment, the total energy in the closed-loop system remains bounded, which ensures stabilit of the overall system. This principle explains why impedance and admittance control strategies, which render the robot passive, are inherently robust even in the face of modeling uncertainties or unknown contact conditions
</details>

**What does it really mean for a robot to “behave like a spring-mass-damper" ?**

![This short video (7 min)](https://youtu.be/Vz5c3il0Dys)
> This short video by Polytech Montréal gives a concise and intuitive introduction to these concepts. It explores the dynamic relationship between force and motion, and shows how this relationship — known as **mechanical impedance** — underlies both impedance and admittance control. If you're unfamiliar with these terms, watch this first — it sets the stage for what follows.

#### Chapter 2.1.1: Mechanical Impedance - the shared foundation
At the core of both impedance and admittance control lies the idea of **mechanical impedance**. It describes how a physical system resists motion when subjected to a force. Unlike static stiffness (which links force to displacement), impedance captures **dynamic behavior** — how velocity (or acceleration) influences the force a system generates or absorbs.

Mathematically, the impedance $Z$ relates the force $F$ to the velocity $v$ of a system $F = Z v$

Depending on the desired dynamic behavior, $Z$ may represent different physical relationships:
- Inertial response: $F = ma$
- Spring-like response (Hooke's law): $F = kx$
- Damping behavior: $F = -bv$
In practice, robots are modeled as combinations of these components.

What’s important is that we’re not just controlling position or force directly — we’re shaping how the robot behaves when interacting with the environment. By making the robot behave like a particular mechanical system (e.g., a stiff spring, a soft damper, or a heavy object), we get force behavior *for free* as a result of motion.


From this shared foundation, two distinct approaches emerge:
- In **impedance control**, we specify the mechanical impedance and **generate force** in response to motion.
- In **admittance control**, we specify the inverse behavior — the mechanical admittance — and **generate motion** in response to force.

#### **Chapter 2.1.2 : Impedance control**

Impedance control is a strategy where the robot is made to replicate the behaviour of a mechanical system, usually a combination of **mass, spring, and damper**, designed to resist motion when subjected to a force. We do not directly command the contact force, but rather define how the robot should respond when force is applied to it by dynamically adjusting the virtual inertia, damping and stiffness of the robot

<figure>
  <img src="{{ site.baseurl }}/assets/images/Force/impedance_schema.png" alt="https://ch.mathworks.com/company/technical-articles/enhancing-robot-precision-and-safety-with-impedance-control.html">
  <figcaption>A simple one-DOF impedance-controlled system.</figcaption>
</figure>

This desired behavior is formalized by the following second-order differential equation:
$$
m_d \ddot{x} + b_d \dot{x} + k_d(x - x_r) = f_e \tag{3.5}
$$

where:
* $x$ is the end-effector position, and $x_r$ is the reference trajectory,
* $m_d$, $b_d$, and $k_d$ are the desired virtual mass, damping, and stiffness,
* $f_e$ is the external force exerted by the environment.


This equation describes how the robot should react to forces. For example:
- A high stiffness ($k_d$) makes the robot stiffer, resisting deviations from $x_r$.
- A high damping ($b_d$) smooths out motion and reduces vibrations.
- A high inertia ($m_d$) makes the robot less sensitive to sudden changes.

The system doesn’t track force — the force arises naturally through this interaction law. Hence, by controlling the impedance of the robot we can manipulate the behavior of the end-effector depending on the interaction with the environment. For example, we can set very low impedance (or high compliance) and make it act like a very loose spring which is useful in physical human-robot interaction or we can set the stiffness very high where the robot would only move to the desired position without much oscillation which is important for precise industrial tasks.

![Illustrative example 2](https://www.youtube.com/watch?v=WS1gSRcJbJQ)

**Stiffness control : a subset of impedance control**

Through impedance control, it is possible to achieve a desired **dynamic** behaviour. A subset of this task is to achieve a **static** behaviour. Instead of specifying how the robot responds dynamically (with mass, damping, and stiffness), we only define a static relationship between the deviation in position/orientation and the force exerted on the environment. This is done by acting on the elements of the stiffness **K** in the impedance model while ignoring inertial and damping terms → **Stiffness control** 

The control law focuses on maintaining a desired position while allowing some compliance, without needing explicit force sensing.
- High stiffness 𝐾 → accurate position tracking, but less compliant
- Low stiffness 𝐾 → more compliant, but allows larger motion deviations under external forces.

This trade-off allows us to limit contact forces and moments, even without a force/torque sensor — simply by choosing the right stiffness. However, in the presence of disturbances (e.g. joint friction), using too low a stiffness may cause the end-effector to deviate significantly from the desired position, even without external contact.

![Illustrative example](https://www.youtube.com/watch?v=pXH7rwrzh6s)


<details markdown = "1">
<summary><strong>But how is impedance control actually implemented in a robot? How do we compute the joint torques τ that produce a response matching this desired impedance?</strong></summary>

The key idea is to design a control law that cancels the robot’s internal dynamics and replaces them with the behavior of a virtual mass-spring-damper system. This is typically done in task space using the following impedance-control algorithm:
$$
\tau = J^T(\theta) \left( \tilde{\Lambda}(\theta)\ddot{x} + \tilde{\eta}(\theta, \dot{x}) - (M\ddot{x} + B\dot{x} + Kx) \right) \tag{3.6}
$$

Here:
  * $\tau$ is the commanded joint torque
  * $J(\theta)$ is the manipulator Jacobian
  * $\tilde{\Lambda}(\theta)\ddot{x} + \tilde{\eta}(\theta, \dot{x})$ represents a model-based estimate of the robot’s actual dynamics (inertia, Coriolis, and gravity effects) --> arm dynamics compensation
  * $M$, $B$, and $K$ are the virtual impedance parameters — the desired inertia, damping, and stiffness
  * $(M\ddot{x} + B\dot{x} + Kx)$ defines the force that would be generated by a virtual mechanical system.

This means that the robot behaves as if it has the mechanical properties we choose — even if it doesn’t physically have them. For instance, you can make a light robot behave like a massive, heavily damped system, enhancing safety and predictability during contact. This control strategy can be visualized as compensating for the robot's true dynamics while injecting the desired mechanical impedance behavior.

The figure below illustrates this structure at the system level:

<figure>
  <img src="{{ site.baseurl }}/assets/images/Force/impedance_control_loop.png" alt="https://link.springer.com/referenceworkentry/10.1007/978-3-642-41610-1_94-1">
  <figcaption>General impedance control scheme for a robot manipulator</figcaption>
</figure>
The measured motion is compared to the reference and used by the impedance controller to compute a corrective force. That force is mapped into joint torques using the *Jacobian transpose* and applied to the manipulator. Optionally, a force sensor may be used to enhance performance or enable force feedback.

</details>


<details markdown="1">
  <summary><strong>Going deeper : Impedance in the Laplace Domain</strong></summary>

To better understand how impedance behaves at different frequencies, we can use the Laplace transform. Taking the Laplace transform of Equation (3.5), assuming zero initial conditions, we obtain:

$$
(m_d s^2 + b_d s + k_d)\left( X(s) - X_r(s) \right) = F_e(s)
$$

Solving for the transfer function between force and position deviation:

$$
Z(s) = \frac{F_e(s)}{X(s) - X_r(s)} = m_d s^2 + b_d s + k_d
$$

This expression tells us how the robot resists motion across different frequency bands:
- At low frequency ($s \to 0$): $Z(s) \approx k_d$ → stiffness dominates.
- At medium frequencies: $Z(s) \approx b_d s$ → damping dominates.
- At high frequency ($s \to \infty$): $Z(s) \approx m_d s^2$ → inertia dominates.

Thus, impedance is not constant — it changes with the rate of motion, which is why impedance control can stabilize interaction with a wide range of environments.
</details>


<details markdown="1">
  <summary><strong>Practical considerations for implementation</strong></summary>
  In an impedance-controlled robot, the goal is to simulate the behavior:

  $$
  M \ddot{x} + B \dot{x} + K x = f_{\text{ext}} \tag{3.6}
  $$
  where
  * $x \in \mathbb{R}^n$ is the end-effector task-space position (e.g., in $\mathbb{R}^3$),
  * $f_{\text{ext}} \in \mathbb{R}^n$ is the external force (or wrench) applied to the robot,
  * $M \in \mathbb{R}^{n \times n}$ is the virtual mass matrix,
  * $B \in \mathbb{R}^{n \times n}$ is the virtual damping matrix,
  * $K \in \mathbb{R}^{n \times n}$ is the virtual stiffness matrix.
  \end{itemize}

  This equation defines how the robot should react to external forces by mimicking virtual mass, damping, and stiffness in task space. The robot senses its own position $x(t)$, velocity $\dot{x}(t)$, and in some cases acceleration $\ddot{x}(t) $ in order to compute motion deviations and apply corresponding torques.

  In practice:
  * Acceleration $ \ddot{x}(t) $ is often noisy and hard to measure.
  * It is common to set $M = 0$, eliminating the mass term for robustness.
  * Most implementations use only encoders and velocity observers — no force sensor is required.
  * Virtual stiffness $K$ and damping $B$ are chosen based on the task and stability.

  Too high a stiffness value $K$ can cause problems, especially in stiff environments or with low-resolution sensors:
  * Small encoder errors or time delays can result in large torque commands.
  * This can lead to instability or oscillations.
  * Using backdrivable or compliant actuators helps mitigate these issues.

  Thus, while the impedance model provides a clear physical target, the actual controller must be carefully tuned and simplified in order to perform robustly on real hardware.

</details>



#### Chapter 2.1.2: Admittance control
It is conceptually the dual of impedance. 
In impedance control, we define how much force the robot should apply in response to a deviation in motion. In admittance control, it’s the opposite: we measure an external force and compute how much the robot should move to accommodate that force.
Rather than generating force commands from motion errors, admittance control takes a force input and outputs a position or velocity adjustment. It creates a compliant behavior by letting the robot “yield” in a controlled way. Practically, the robot is typically position-controlled at its core, but an outer loop takes the force error and computes a small shift in the commanded position (or trajectory) to relieve or accommodate that force​. For instance, if a force of 10N is pushing the robot off its path, an admittance controller might say “yield by 1 mm” (depending on a compliance setting) – effectively, the robot moves slightly until the force reduces. 

Admittance control often involves two loops: 
* an **outer force loop** that modifies the target position based on force input.
* an **inner high-bandwidth control loop**  that ensures accurate tracking of the compliant position or velocity reference.

<figure>
  <img src="{{ site.baseurl }}/assets/images/Force/admittance_control_loop.png" alt="https://link.springer.com/referenceworkentry/10.1007/978-3-642-41610-1_94-1">
  <figcaption>General admittance control scheme for a robot manipulator</figcaption>
</figure>

**Outer Loop: Virtual Mechanical behavior**
The outer loop defines a second-order mechanical behavior that governs how the compliant trajectory $x_c$  evolves in response to force:

  $$
      m_d(\ddot{x}_c - \ddot{x}_r) + b_d(\dot{x}_c - \dot{x}_r) + k_d(x_c - x_r) = f_e
  $$
  where:
  - $x_c$: compliant position generated by the controller
  - $x_r$: desired nominal trajectory.
  - $f_e$: external force
  -$m_d$, $b_d$, $k_d$: desired virtual inertia, damping, and stiffness.

  In many implementations, $\dot{x}_r$ and $\ddot{x}_r$ are zero, simplifying to:
  $$
      m_d \ddot{x}_c + b_d \dot{x}_c + k_d(x_c - x_r) = f_e 
  $$
  This dynamic relationship defines how the commanded position $x_c$ is adjusted in response to the external force $f_e$.

**Inner Loop: Tracking the Compliant Motion**
The inner controller, then, drives the robot to track $x_c$ using a standard feedback law, for instance:
  $$
    F = k_p(x_c - x) + k_v(\dot{x}_c - \dot{x})
  $$
where:
- $x$ and $\dot{x}$: the actual end-effector position and velocity
- $k_p$ and $k_v$ are the control gains.

![Illustrative example](https://www.youtube.com/watch?v=JRbAesam-EE)

<details markdown="1">
  <summary><strong> Going deeper : Admittance in the Laplace domain</strong></summary>
Just like impedance, admittance is often studied in the frequency domain. Starting from the equation:

$$
m_d \ddot{x}_c + b_d \dot{x}_c + k_d (x_c - x_r) = f_e
$$

we take the Laplace transform (assuming $x_r = 0$), which yields:

$$
(m_d s^2 + b_d s + k_d) X_c(s) = F_e(s)
$$

Solving for the transfer function gives the admittance:

$$
Y(s) = \frac{X_c(s)}{F_e(s)} = \frac{1}{m_d s^2 + b_d s + k_d}
$$

This is the inverse of the impedance $Z(s)$. The admittance $Y(s)$ tells us how much motion results from a given force input, and its behavior depends on frequency:

* At low frequency, $Y(s)$ is dominated by stiffness $k_d$,
* At medium frequency, by damping $b_d$,
* At high frequency, by inertia $m_d$.


Low admittance (i.e., small motion in response to force) tends to enhance stability; high admittance (fast motion) may lead to instability if not properly controlled.
</details>


Both impedance and admittance achieve force indirectly by shaping how the robot responds to contact. They can be used to make a robot compliant without sacrificing stability. However, they have different practical considerations: for example, admittance control assumes a very stiff inner position control (common in industrial arms) and adjusts commands externally, which works well when you can trust the position control to execute quickly​. Impedance control embeds compliance in the low-level control (joint torques), which can be more direct but may face stability issues if the environment is very stiff and the controller is also stiff​. In summary, indirect force control lets the robot simulate a mechanical behavior (softness or stiffness) to handle contact forces gracefully, rather than directly pushing or pulling with a specified force.


<details>
<summary>To go deeper in the theory</summary>
[Robotics 2 – Impedance Control](https://www.youtube.com/watch?v=IolG5V_skv8)  
This lecture from **Sapienza University of Rome** provides a thorough and rigorous look at impedance control. It dives into the mathematical foundations and practical considerations behind the method, making it especially useful if you're aiming to understand how impedance control is derived and implemented at a deeper level. Recommended for students who are already comfortable with dynamics, control theory and robotic modeling.
</details>

<details>
<summary>Conceptual exercise</summary>

*What is the difference between traditional position control with a PD controller and joint-stiffness control?*

The difference in the algebra is quite small. A PD control would typically have the form $$u=K_p(q_d-q) +
      K_d(\dot{q}_d - \dot{q}),$$
whereas stiffness control is $$u = -\tau_g(q)
      + K_p(q_d-q) + K_d(\dot{q}_d - \dot{q}).$$
In other words, stiffness control tries to cancel out the gravity and any other estimated terms, like friction, in the model. As written, this obviously requires an estimated model (which we have for iiwa, but don't believe we have for most arms with large gear-ratio transmissions) and torque control. But this small difference in the algebra can make a profound difference in practice. The controller is no longer depending on error to achieve the joint position in steady state. As such we can turn the gains way down, and in practice have a much more compliant response while still achieving good tracking when there are no external torques.
</details>
<details>
<summary>Programming Exercise</summary>

[2.1 Programming Exercise : Impedance controller](https://learningadaptivereactiverobotcontrol.github.io/book-website.io//documentation/L9-Impedance.html)
</details>

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

#### **Chapter 2.2.1: Hybrid Force/Motion Control**
![Intuition](https://www.youtube.com/watch?v=BXu9C3joUSk)	

The aim of hybrid force/motion control is to split up simultaneous control of both end-effector motion and contact forces into two separate decoupled but coordinated subproblems

![Fig3.10]({{ site.baseurl }}/assets/images/Force/hybrid_controller.png)(Hybrid controller)
*(https://rocco.faculty.polimi.it/cir/Control%20of%20the%20interaction.pdf)(P 38)*

The idea is to decouple all 6 degrees of freedom of the task (3 translations and 3 rotations) into two orthogonal subspaces and apply either a motion based control or a force based control onto each of the axes. Unconstrained (free) axes are controlled in position while constrained axes are controlled by applying a constant force 

Consider the illustrative scenario (osrobotics.org) (Figure 3.10), where a robot end-effector slides on a table surface. Here, the vertical direction (Z-axis) demands force control to maintain consistent contact force, while the horizontal direction (X-axis) requires position control to follow a prescribed trajectory. Such scenarios frequently occur in grinding or polishing tasks.
![Fig3.10]({{ site.baseurl }}/assets/images/Force/hybrid_1.png)(Figure 3.10. End-effector sliding and corresponding block diagram to control normal contact force in Z and position in X.)

![Illustrative example](https://www.youtube.com/watch?v=R2zwEaxyhY0)

**How to Choose the Constraints: Natural vs Artificial**

In hybrid force/motion control, one of the most important design decisions is how to split the task space into motion-controlled and force-controlled directions. This is not arbitrary — it should be based on both the task requirements and the physical properties of the robot’s environment.
We make this decision by distinguishing between:
 * Natural constraints — limitations imposed by the environment that restrict motion or wrench. These are not imposed by the robot, but arise from rigid contact (e.g. a table blocks downward motion, or a peg in a hole restricts lateral translation).

* Artificial constraints — constraints imposed by the controller. These are where we actively control either position or force, depending on what the task requires.

In theory:
* Force control should be applied along directions that are naturally constrained (e.g. control the contact force along the surface normal).
* Motion control should be applied along directions that are unconstrained by the environment (e.g. free tangential movement).

A binary selection vector $s$ is often used to helps distinguish force-controlled and position-controlled axes. If $s_j = 1$, the controller prioritizes force control along the corresponding axis, enforcing a desired force $F_{d,j}$ while allowing position adjustment. Conversely, if $s_j = 0$, position control dominates, tracking the trajectory $x_{d,j}$ regardless of the force generated.The controller is then designed to enforce $$s_i(F_j - F_{d,j}) + (1 - s_i)(x_j - x_{d,j}) = 0$$
This means: if $s_j = 1$ (force-controlled axis), track the desired force $F_{d,j}$ (let position adjust as needed), and if $s_j = 0$ (position-controlled axis), track the desired position $x_{d,j}$ (while allowing whatever force arises).

This structure allows the robot to behave appropriately in tasks with partial constraint — controlling contact forces where needed, while allowing motion freedom in unconstrained directions.

![Hybrid motion/force control](https://youtu.be/UR0GpaaBVKk?si=_8KyDB-Hhl7YSeX9) --> A short video explaining in more mathematical terms what was presented in this section

<details>
<summary>Conceptual Exercise</summary>
<html>
<head>
  <meta charset="UTF-8">
  <title>Hybrid Force/Motion Control - Drag and Drop</title>
  <style>
    .drag-container {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .drag-item {
      padding: 0.5rem 1rem;
      background-color: #f2f2f2;
      border: 1px solid #ccc;
      border-radius: 6px;
      cursor: grab;
      user-select: none;
    }
    .drop-zone {
      border: 2px dashed #999;
      border-radius: 6px;
      min-height: 200px;
      padding: 1rem;
      width: 45%;
      background-color: #fafafa;
    }
    .drop-zone h3 {
      margin-top: 0;
      font-size: 1.1rem;
    }
    .check-button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      font-size: 1rem;
    }
    .feedback {
      font-weight: bold;
      margin-top: 1rem;
    }
  </style>
</head>
<body>

<p>Drag each axis into the correct constraint category.</p>
<p><strong>Notation:</strong> Each term refers to a motion or force component in the contact frame <code>c</code>:
  <ul>
    <li><code>ẋ<sub>i</sub><sup>c</sup></code> – linear velocity along axis <code>i</code> (<code>x</code>, <code>y</code>, or <code>z</code>)</li>
    <li><code>ω<sub>i</sub><sup>c</sup></code> – angular velocity about axis <code>i</code></li>
    <li><code>f<sub>i</sub><sup>c</sup></code> – force along axis <code>i</code></li>
    <li><code>μ<sub>i</sub><sup>c</sup></code> – moment (torque) about axis <code>i</code></li>
  </ul>
</p>

<!-- EXERCISE 1 -->
<h3>Sliding on a Flat Surface</h3>
<img src="../assets/images/Force/flat.png" alt="flat">
<div class="drag-container" id="drag-items-1">
  <div class="drag-item" id="hfc1_1" draggable="true" ondragstart="drag(event)">ẋ<sub>z</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc1_2" draggable="true" ondragstart="drag(event)">ω<sub>x</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc1_3" draggable="true" ondragstart="drag(event)">ω<sub>y</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc1_4" draggable="true" ondragstart="drag(event)">f<sub>x</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc1_5" draggable="true" ondragstart="drag(event)">f<sub>y</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc1_6" draggable="true" ondragstart="drag(event)">μ<sub>z</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc1_7" draggable="true" ondragstart="drag(event)">f<sub>z</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc1_8" draggable="true" ondragstart="drag(event)">ẋ<sub>x</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc1_9" draggable="true" ondragstart="drag(event)">ẋ<sub>y</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc1_10" draggable="true" ondragstart="drag(event)">μ<sub>x</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc1_11" draggable="true" ondragstart="drag(event)">μ<sub>y</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc1_12" draggable="true" ondragstart="drag(event)">ω<sub>z</sub><sup>c</sup></div>
</div>
<div class="drag-container">
  <div class="drop-zone" id="natural1" ondrop="drop(event)" ondragover="allowDrop(event)">
    <h3>🟦 Natural Constraints</h3>
  </div>
  <div class="drop-zone" id="artificial1" ondrop="drop(event)" ondragover="allowDrop(event)">
    <h3>🟨 Artificial Constraints</h3>
  </div>
</div>
<button class="check-button" onclick="checkAnswer(1)">Check Answer</button>
<div class="feedback" id="feedback1"></div>

<!-- EXERCISE 2 -->
<h3>Peg Insertion</h3>
<img src="../assets/images/Force/peg.png" alt="peg">
<div class="drag-container" id="drag-items-2">
  <div class="drag-item" id="hfc2_1" draggable="true" ondragstart="drag(event)">ẋ<sub>x</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc2_2" draggable="true" ondragstart="drag(event)">ẋ<sub>y</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc2_3" draggable="true" ondragstart="drag(event)">ω<sub>x</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc2_4" draggable="true" ondragstart="drag(event)">ω<sub>y</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc2_5" draggable="true" ondragstart="drag(event)">f<sub>z</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc2_6" draggable="true" ondragstart="drag(event)">μ<sub>z</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc2_7" draggable="true" ondragstart="drag(event)">f<sub>x</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc2_8" draggable="true" ondragstart="drag(event)">f<sub>y</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc2_9" draggable="true" ondragstart="drag(event)">μ<sub>x</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc2_10" draggable="true" ondragstart="drag(event)">μ<sub>y</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc2_11" draggable="true" ondragstart="drag(event)">ẋ<sub>z</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc2_12" draggable="true" ondragstart="drag(event)">ω<sub>z</sub><sup>c</sup></div>
</div>
<div class="drag-container">
  <div class="drop-zone" id="natural2" ondrop="drop(event)" ondragover="allowDrop(event)">
    <h3>🟦 Natural Constraints</h3>
  </div>
  <div class="drop-zone" id="artificial2" ondrop="drop(event)" ondragover="allowDrop(event)">
    <h3>🟨 Artificial Constraints</h3>
  </div>
</div>
<button class="check-button" onclick="checkAnswer(2)">Check Answer</button>
<div class="feedback" id="feedback2"></div>

<!-- EXERCISE 3 -->
<h3>Crank Rotation</h3>
<img src="../assets/images/Force/Rotation.png" alt="rotation">
<div class="drag-container" id="drag-items-3">
  <div class="drag-item" id="hfc3_1" draggable="true" ondragstart="drag(event)">ẋ<sub>x</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc3_2" draggable="true" ondragstart="drag(event)">ẋ<sub>z</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc3_3" draggable="true" ondragstart="drag(event)">ω<sub>x</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc3_4" draggable="true" ondragstart="drag(event)">ω<sub>y</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc3_5" draggable="true" ondragstart="drag(event)">f<sub>x</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc3_6" draggable="true" ondragstart="drag(event)">f<sub>z</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc3_7" draggable="true" ondragstart="drag(event)">μ<sub>x</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc3_8" draggable="true" ondragstart="drag(event)">μ<sub>y</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc3_9" draggable="true" ondragstart="drag(event)">f<sub>y</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc3_10" draggable="true" ondragstart="drag(event)">ẋ<sub>y</sub><sup>c</sup></div>
  <div class="drag-item" id="hfc3_11" draggable="true" ondragstart="drag(event)">ω<sub>z</sub><sup>c</sup></div>
</div>
<div class="drag-container">
  <div class="drop-zone" id="natural3" ondrop="drop(event)" ondragover="allowDrop(event)">
    <h3>🟦 Natural Constraints</h3>
  </div>
  <div class="drop-zone" id="artificial3" ondrop="drop(event)" ondragover="allowDrop(event)">
    <h3>🟨 Artificial Constraints</h3>
  </div>
</div>
<button class="check-button" onclick="checkAnswer(3)">Check Answer</button>
<div class="feedback" id="feedback3"></div>

<script>
function allowDrop(ev) {
  ev.preventDefault();
}
function drag(ev) {
  ev.dataTransfer.setData("id", ev.target.id);
}
function drop(ev) {
  ev.preventDefault();
  if (!ev.target.classList.contains("drop-zone")) return;
  const id = ev.dataTransfer.getData("id");
  const el = document.getElementById(id);
  if (el && el.parentNode !== ev.target) {
    ev.target.appendChild(el);
  }
}
function checkAnswer(exerciseNum) {
  const answers = {
    1: {
      natural: ["ẋ<sub>z</sub><sup>c</sup>", "ω<sub>x</sub><sup>c</sup>", "ω<sub>y</sub><sup>c</sup>"],
      artificial: ["f<sub>x</sub><sup>c</sup>", "f<sub>y</sub><sup>c</sup>", "μ<sub>z</sub><sup>c</sup>", "f<sub>z</sub><sup>c</sup>", "ẋ<sub>x</sub><sup>c</sup>", "ẋ<sub>y</sub><sup>c</sup>", "μ<sub>x</sub><sup>c</sup>", "μ<sub>y</sub><sup>c</sup>", "ω<sub>z</sub><sup>c</sup>"]
    },
    2: {
      natural: ["f<sub>z</sub><sup>c</sup>", "ω<sub>z</sub><sup>c</sup>", "ẋ<sub>z</sub><sup>c</sup>"],
      artificial: ["ẋ<sub>x</sub><sup>c</sup>", "ẋ<sub>y</sub><sup>c</sup>", "ω<sub>x</sub><sup>c</sup>", "ω<sub>y</sub><sup>c</sup>", "f<sub>x</sub><sup>c</sup>", "f<sub>y</sub><sup>c</sup>", "μ<sub>x</sub><sup>c</sup>", "μ<sub>y</sub><sup>c</sup>", "μ<sub>z</sub><sup>c</sup>"]
    },
    3: {
      natural: ["ω<sub>z</sub><sup>c</sup>"],
      artificial: ["ẋ<sub>x</sub><sup>c</sup>", "ẋ<sub>y</sub><sup>c</sup>", "ẋ<sub>z</sub><sup>c</sup>", "ω<sub>x</sub><sup>c</sup>", "ω<sub>y</sub><sup>c</sup>", "f<sub>x</sub><sup>c</sup>", "f<sub>y</sub><sup>c</sup>", "f<sub>z</sub><sup>c</sup>", "μ<sub>x</sub><sup>c</sup>", "μ<sub>y</sub><sup>c</sup>"]
    }
  };
  const natElems = Array.from(document.querySelectorAll(`#natural${exerciseNum} .drag-item`)).map(e => e.innerHTML.trim());
  const artElems = Array.from(document.querySelectorAll(`#artificial${exerciseNum} .drag-item`)).map(e => e.innerHTML.trim());
  const natCorrect = answers[exerciseNum].natural;
  const artCorrect = answers[exerciseNum].artificial;

  const natOK = natElems.every(e => natCorrect.includes(e)) && natElems.length === natCorrect.length;
  const artOK = artElems.every(e => artCorrect.includes(e)) && artElems.length === artCorrect.length;

  const feedback = document.getElementById("feedback" + exerciseNum);
  if (natOK && artOK) {
    feedback.textContent = "✅ Correct! Well done.";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "❌ Not quite. Try again!";
    feedback.style.color = "red";
  }
}
</script>

</body>
</html>
</details>


Hybrid position/force control is based on a nominal model of the interaction. Inconsistency
may however occur in the measurements, due e.g. to:
* friction at the contact (a force is detected in a nominally free direction)
* compliance in the robot structure and/or at the contact (a displacement is detected in a
direction which is nominally constrained in motion)
* uncertainty in the environment geometry at the contact

[Intuition](https://www.youtube.com/watch?v=8VB5NneTKLE)

![Video to go deeper into theory](https://www.youtube.com/watch?v=TyzTkIbWPyQ) --> This is a much longer video but very interesting and didactic

**Exercise**

[Hybrid Force/Position control Assignment](https://deepnote.com/workspace/Manipulation-ac8201a1-470a-4c77-afd0-2cc45bc229ff/project/87d8044f-3eb2-4f25-b52f-f51a5eca68b7/notebook/hybridforceposition-25104d02b7bc429bb3d71ef7e5d1c2bb)
This is an assignment given in the [Robotic Manipulation course](https://manipulation.csail.mit.edu/force.html#example2) given in MIT. It uses Python with a custom library that can be easily installed on mac or Ubuntu ```pip install manipulation``` or directly executing in DeepNote.
It comprises conceptual exercises as well as programming. The only problem is that a solution is not provided. 

![Hybrid_assignment]({{ site.baseurl }}/assets/images/Force/hybrid_assignment.png)

# Summary

<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Control Schemes – Dropdown Table</title>
  <style>
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1rem;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 10px;
      text-align: center;
    }
    th {
      background-color: #eee;
    }
    select {
      width: 100%;
      padding: 6px;
    }
  </style>
</head>
<body>

<h2>Different Control strategies</h2>
<p>Select the correct option in each cell, then click <strong>Check Answers</strong>.</p>

<table>
  <thead>
    <tr>
      <th>Control Scheme</th>
      <th>Work Space</th>
      <th>Measured Variables</th>
      <th>Applied Situations</th>
      <th>Control Objectives</th>
    </tr>
  </thead>
  <tbody>
    <!-- Position Control -->
    <tr>
      <td><strong>Position Control</strong></td>
      <td><select data-answer="Task space" class="answer">
        <option value="">-- Select --</option>
        <option>Task space</option>
        <option>Position subspace, Force subspace</option>
      </select></td>
      <td><select data-answer="Position" class="answer">
        <option value="">-- Select --</option>
        <option>Position</option>
        <option>Contact Force</option>
        <option>Position, Contact Force</option>
      </select></td>
      <td><select data-answer="Free motion" class="answer">
        <option value="">-- Select --</option>
        <option>Free motion</option>
        <option>Constrained motion</option>
        <option>All kinds of motion</option>
      </select></td>
      <td><select data-answer="Desired position" class="answer">
        <option value="">-- Select --</option>
        <option>Desired position</option>
        <option>Desired contact force</option>
        <option>Desired position, Desired contact force</option>
        <option>Impedance</option>
      </select></td>
    </tr>

    <!-- Force Control -->
    <tr>
      <td><strong>Force Control</strong></td>
      <td><select data-answer="Task space" class="answer">
        <option value="">-- Select --</option>
        <option>Task space</option>
        <option>Position subspace, Force subspace</option>
      </select></td>
      <td><select data-answer="Contact Force" class="answer">
        <option value="">-- Select --</option>
        <option>Position</option>
        <option>Contact Force</option>
        <option>Position, Contact Force</option>
      </select></td>
      <td><select data-answer="Constrained motion" class="answer">
        <option value="">-- Select --</option>
        <option>Free motion</option>
        <option>Constrained motion</option>
        <option>All kinds of motion</option>
      </select></td>
      <td><select data-answer="Desired contact force" class="answer">
        <option value="">-- Select --</option>
        <option>Desired position</option>
        <option>Desired contact force</option>
        <option>Desired position, Desired contact force</option>
        <option>Impedance</option>
      </select></td>
    </tr>

    <!-- Hybrid Control -->
    <tr>
      <td><strong>Hybrid Control</strong></td>
      <td><select data-answer="Position subspace, Force subspace" class="answer">
        <option value="">-- Select --</option>
        <option>Task space</option>
        <option>Position subspace, Force subspace</option>
      </select></td>
      <td><select data-answer="Position, Contact Force" class="answer">
        <option value="">-- Select --</option>
        <option>Position</option>
        <option>Contact Force</option>
        <option>Position, Contact Force</option>
      </select></td>
      <td><select data-answer="All kinds of motion" class="answer">
        <option value="">-- Select --</option>
        <option>Free motion</option>
        <option>Constrained motion</option>
        <option>All kinds of motion</option>
      </select></td>
      <td><select data-answer="Desired position, Desired contact force" class="answer">
        <option value="">-- Select --</option>
        <option>Desired position</option>
        <option>Desired contact force</option>
        <option>Desired position, Desired contact force</option>
        <option>Impedance</option>
      </select></td>
    </tr>

    <!-- Impedance Control -->
    <tr>
      <td><strong>Impedance Control</strong></td>
      <td><select data-answer="Task space" class="answer">
        <option value="">-- Select --</option>
        <option>Task space</option>
        <option>Position subspace, Force subspace</option>
      </select></td>
      <td><select data-answer="Position, Contact Force" class="answer">
        <option value="">-- Select --</option>
        <option>Position</option>
        <option>Contact Force</option>
        <option>Position, Contact Force</option>
      </select></td>
      <td><select data-answer="All kinds of motion" class="answer">
        <option value="">-- Select --</option>
        <option>Free motion</option>
        <option>Constrained motion</option>
        <option>All kinds of motion</option>
      </select></td>
      <td><select data-answer="Impedance" class="answer">
        <option value="">-- Select --</option>
        <option>Desired position</option>
        <option>Desired contact force</option>
        <option>Desired position, Desired contact force</option>
        <option>Impedance</option>
      </select></td>
    </tr>
  </tbody>
</table>

<button id="check-button">✅ Check Answers</button>
<p id="dropdown-feedback" style="font-weight: bold; margin-top: 10px;"></p>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("check-button").addEventListener("click", function () {
      let correct = 0;
      let total = 0;

      document.querySelectorAll("select.answer").forEach(select => {
        const expected = select.getAttribute("data-answer").trim().toLowerCase();
        const actual = select.value.trim().toLowerCase();
        total++;

        if (expected === actual && actual !== "") {
          select.style.backgroundColor = "#c8f7c5"; // green
          correct++;
        } else {
          select.style.backgroundColor = "#f7c5c5"; // red
        }
      });

      const feedback = document.getElementById("dropdown-feedback");
      if (correct === total) {
        feedback.textContent = "✅ All answers are correct!";
        feedback.style.color = "green";
      } else {
        feedback.textContent = `❌ ${correct} out of ${total} correct. Try again!`;
        feedback.style.color = "red";
      }
    });
  });
</script>

</body>
</html>

10.1109/CRC.2017.20

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