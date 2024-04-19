import smtplib, ssl
import psycopg2

port = 465  # For SSL

# Email account to send emails from
email = "projectosiristest@gmail.com"
password = "csth aihl kmja uvnx"

def notifyAll(targets):
    # Important to leave this exactly as-is, because formatting is incredibly finicky
    message = """\
Subject: Project Osiris Wildfire Alert
From: Project Osiris Test Account

There has been predicted to be high fire risk in your area."""

    # Create a secure SSL context
    context = ssl.create_default_context()
    
    # Connects to the SMTP server
    with smtplib.SMTP_SSL("smtp.gmail.com", port, context=context) as server:
        server.login(email, password)

        # Sends emails to every email in the list, modify this to send individual messages to each, with unsubcribe links attached
        for target in targets:
            server.sendmail(email, target, message)

def executeQuery(query, response_needed):
        # Run query
        try:
            conn = psycopg2.connect("dbname='shpbzsoi' user='shpbzsoi' host='bubble.db.elephantsql.com' password='wB0kROcAF134esw1aPsWsqWhTlYbDacm'")
        except:
            print("Unable to connect")
        
        cur = conn.cursor()
        cur.execute(query)

        # Get response
        if response_needed:
            result = cur.fetchall()
        conn.close()

        if response_needed:
            return result

def highRisk(latitude, longitude):
    # Gets the list of emails that are at the given location (modify to get all emails within a certain range *near* location)
    query = "SELECT DISTINCT email FROM emails WHERE latitude=" + str(latitude) + " AND longitude=" + str(longitude) + ";"
    targets = executeQuery(query, True)

    notifyAll(targets)

highRisk(0, 0)