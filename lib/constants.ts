// ============================================================================
// SITE CONFIGURATION
// ============================================================================

export const SITE_CONFIG = {
  name: "Yash Oza",
  role: "Senior DevOps & Software Engineer",
  tagline: "I architect the infrastructure that lets engineering teams ship fast and sleep well.",
  email: "yashdoza19@gmail.com",
  phone: "(857) 891-7250",
  location: "Boston, MA",
  social: {
    github: "https://github.com/yashoza19",
    linkedin: "https://linkedin.com/in/yashoza19",
    twitter: "https://x.com/yashdoza",
    calendly: "https://calendly.com/yashdoza19/15min",
  },
  resume: "/resume.pdf",
};

// ============================================================================
// WORK EXPERIENCE
// ============================================================================

export const EXPERIENCES = [
  {
    company: "Red Hat, Inc.",
    role: "Senior Software Engineer",
    period: "April 2021 – Present",
    description: "Application Infrastructure & Developer Platform Engineering",
    highlights: [
      "Designed containerized RAG pipelines, LLM-based agents, and transaction monitoring systems on multi-cluster Kubernetes/OpenShift with Kafka-based event streaming — 10+ production-ready reference architectures adopted by external teams",
      "Reduced certification pipeline failure remediation time by 40%, ensuring SLA compliance for 100+ partner certifications via CI/CD automation with Jenkins and GitHub Actions",
      "Built Terraform-based IaC templates and deployment guardrails for multi-cluster OpenShift provisioning — zero rollback incidents in partner environments",
      "Mentored 15+ engineers and ISV partners on Kubernetes architecture, container networking, service mesh (Istio), and network policy design",
      "Drove the technical roadmap for OpenShift Preflight certification tooling, validating container images and Kubernetes operators against Red Hat compliance standards",
      "Cut partner infrastructure onboarding time by 50% by automating multi-cluster setup with Terraform, Ansible, and reusable CloudFormation stacks across AWS",
      "Debugged overlay networking issues, service mesh misconfigurations, and inter-cluster communication patterns in high-availability production environments",
    ],
  },
  {
    company: "CTNI, Northeastern University",
    role: "Graduate Research Assistant (DevOps Lead)",
    period: "Dec 2020 – Mar 2021",
    description: "Cloud infrastructure and CI/CD for clinical research platform",
    highlights: [
      "Architected a production-ready MRI management platform on AWS with 99.9% uptime using version-controlled CloudFormation and AWS CLI automation",
      "Achieved zero-downtime deployments by containerizing React/Flask services with Docker on auto-scaling ECS behind Application Load Balancers",
      "Reduced release cycle from days to under 30 minutes with end-to-end AWS CodePipeline CI/CD",
    ],
  },
  {
    company: "Ribbon Communications",
    role: "Software Engineer Intern (DevOps)",
    period: "Sep 2019 – Dec 2019",
    description: "CI/CD optimization and infrastructure automation",
    highlights: [
      "Improved real-time monitoring response time by 80% by replacing monolithic scripts with a microservices architecture",
      "Reduced JFrog Artifactory storage consumption by 10% via automated Jenkins pipelines for artifact cleanup",
      "Automated version documentation for 200+ VMs with Python scripts integrated into Jenkins, published to Confluence",
    ],
  },
];

// ============================================================================
// PROJECTS
// ============================================================================

export const PROJECTS = [
  {
    title: "AI Quickstarts on OpenShift",
    description: "Open-source reference architectures for deploying AI applications (RAG pipelines, LLM agents, transaction monitoring) on OpenShift AI with containerized microservices and Kafka event streaming.",
    tech: ["Kubernetes", "OpenShift", "Python", "Kafka", "Docker", "Helm"],
    repoUrl: "https://github.com/yashoza19",
    image: "/images/projects/ai-quickstarts.jpg",
    featured: true,
  },
  {
    title: "OpenShift Preflight Certification",
    description: "Contributed to certification tooling that validates container images and Kubernetes operators against Red Hat compliance standards. Built pipeline alerting for failure remediation across 10+ repos.",
    tech: ["Go", "Kubernetes", "Jenkins", "GitHub Actions", "Docker"],
    repoUrl: "https://github.com/yashoza19",
    image: "/images/projects/preflight.jpg",
    featured: true,
  },
  {
    title: "Kubernetes Microservices App",
    description: "High-availability Kubernetes cluster on AWS using kops, with containerized frontend/backend services, Jenkins CI/CD on EC2, and Ansible-based configuration management.",
    tech: ["Kubernetes", "AWS", "Docker", "Jenkins", "Ansible", "Node.js", "PostgreSQL"],
    repoUrl: "https://github.com/yashoza19",
    image: "/images/projects/k8s-microservices.jpg",
    featured: true,
  },
  {
    title: "Cloud-Based Web Application",
    description: "Fault-tolerant full-stack app on AWS leveraging EC2, RDS, DynamoDB, S3, Lambda, SNS, Route53, Auto Scaling Groups with CloudFormation IaC and CircleCI/CodeDeploy for continuous delivery.",
    tech: ["AWS", "CloudFormation", "Lambda", "DynamoDB", "CircleCI", "CodeDeploy"],
    repoUrl: "https://github.com/yashoza19",
    image: "/images/projects/cloud-app.jpg",
    featured: true,
  },
  {
    title: "MRI Management Platform",
    description: "Cloud-based clinical research platform on AWS with containerized React/Flask services on ECS, zero-downtime deployments, and end-to-end CI/CD via CodePipeline.",
    tech: ["AWS", "Docker", "ECS", "React", "Flask", "CloudFormation", "CodePipeline"],
    repoUrl: "https://github.com/yashoza19",
    image: "/images/projects/mri-platform.jpg",
    featured: true,
  },
  {
    title: "Serverless Messaging App",
    description: "Real-time serverless messaging application using AWS Lambda, API Gateway, and Django with JWT authentication and session management.",
    tech: ["AWS Lambda", "API Gateway", "Django", "Python", "JWT"],
    repoUrl: "https://github.com/yashoza19",
    image: "/images/projects/serverless-messaging.jpg",
    featured: false,
  },
];

// ============================================================================
// SKILLS & TECH STACK
// ============================================================================

export const SKILLS = {
  "Container & Orchestration": [
    "Kubernetes",
    "OpenShift",
    "Docker",
    "Helm",
    "Multi-cluster management",
  ],
  "Cloud (AWS)": [
    "EC2",
    "S3",
    "RDS",
    "IAM",
    "VPC",
    "Lambda",
    "ECS",
    "CloudWatch",
    "Route53",
    "SNS/SQS",
    "CodePipeline",
    "CodeDeploy",
    "CloudTrail",
    "Organizations",
  ],
  "Infrastructure as Code": [
    "Terraform",
    "CloudFormation",
    "Ansible",
  ],
  "CI/CD & Automation": [
    "Jenkins",
    "GitHub Actions",
    "CircleCI",
    "AWS CodePipeline",
    "JFrog Artifactory",
  ],
  "Networking & Service Mesh": [
    "Istio",
    "Container networking",
    "Overlay networks",
    "Network policies",
  ],
  "Languages": [
    "Python",
    "Bash",
    "Java",
    "JavaScript",
    "Node.js",
    "Go",
  ],
  "Monitoring & Observability": [
    "CloudWatch",
    "Pipeline alerting",
    "Failure diagnostics",
  ],
  "Event Streaming": [
    "Kafka",
    "SNS/SQS",
  ],
  "Tools": [
    "Git",
    "Postman",
    "Confluence",
    "VS Code",
    "Jupyter",
  ],
};

// ============================================================================
// STATS (for About section)
// ============================================================================

export const STATS = {
  yearsExperience: 5,
  partnerCertifications: 100,
  engineersMentored: 15,
  referenceArchitectures: 10,
};

// ============================================================================
// EDUCATION
// ============================================================================

export const EDUCATION = [
  {
    degree: "Master of Science, Information Systems",
    institution: "Northeastern University",
    location: "Boston, MA",
    date: "August 2020",
  },
  {
    degree: "Bachelor of Technology, Information Technology",
    institution: "Nirma University",
    location: "Ahmedabad, India",
    date: "May 2018",
  },
];

// ============================================================================
// CERTIFICATIONS
// ============================================================================

export const CERTIFICATIONS = [
  "AWS Solutions Architect Associate",
  "Red Hat Certified System Administrator (RHCSA)",
];

// ============================================================================
// NAVIGATION
// ============================================================================

export const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

// ============================================================================
// FOOTER LINKS
// ============================================================================

export const FOOTER_LINKS = {
  social: [
    { label: "GitHub", href: SITE_CONFIG.social.github },
    { label: "LinkedIn", href: SITE_CONFIG.social.linkedin },
    { label: "Twitter", href: SITE_CONFIG.social.twitter },
    { label: "Email", href: `mailto:${SITE_CONFIG.email}` },
  ],
  legal: [
    // TODO: Add legal pages if needed
    // { label: "Privacy", href: "/privacy" },
    // { label: "Terms", href: "/terms" },
  ],
};
