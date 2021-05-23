package app.metatron.discovery.domain.dataconnection.connector;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

@Component
public class Neo4jJdbcConnector extends CachedUserJdbcConnector{
    private static final Logger LOGGER = LoggerFactory.getLogger(Neo4jJdbcConnector.class);

    @Override
    public Connection getConnection(String connectionUrl, Properties properties, String driverClassName) {
        Connection connection = super.getConnection(connectionUrl, properties, driverClassName);
        try{
            connection.setAutoCommit(false);
        } catch (SQLException e){
            LOGGER.error(e.getMessage(), e);
        }
        return connection;
    }
}
