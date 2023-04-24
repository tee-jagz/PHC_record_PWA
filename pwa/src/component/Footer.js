// Import React and Ant Design components
import React from 'react'
import { Layout } from 'antd'

// Define the Footer component
const Footer = () => {
  // Get the Footer component from Ant Design
  const { Footer } = Layout

  // Return the JSX code for the footer
  return (
    <Footer style={{  position: 'fixed', width:'100%', bottom: '0', textAlign: 'center' }}>
      {/* Add your email, phone number and address here */}
      <p>Email: example@example.com</p>
      <p>Phone: +1-234-567-8900</p>
      <p>Address: 123 Main Street, Anytown, USA</p>
      {/* Add your copyrite information here */}
      <p>©2023 Your Company Name. All rights reserved.</p>
    </Footer>
  )
}

// Export the Footer component
export default Footer