package app.metatron.discovery.domain.dataconnection.dialect;

import org.apache.commons.lang3.StringUtils;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.sql.SQLException;
import java.util.List;

import app.metatron.discovery.common.exception.FunctionWithException;
import app.metatron.discovery.extension.dataconnection.jdbc.JdbcConnectInformation;
import app.metatron.discovery.extension.dataconnection.jdbc.dialect.JdbcDialect;

@Order(3)
@Component
public class Neo4jDialect implements JdbcDialect {

  private static final String NEO4J_URL_PREFIX = "jdbc:neo4j:bolt:/";

    @Override
    public String getName() {
        return "Neo4j";
    }

    @Override
    public Scope getScope() {
        return Scope.EMBEDDED;
    }

    @Override
    public String getIconResource1() {
        return null;
    }

    @Override
    public String getIconResource2() {
        return null;
    }

    @Override
    public String getIconResource3() {
        return null;
    }

    @Override
    public String getIconResource4() {
        return null;
    }

    @Override
    public String getImplementor() {
        return "NEO4J";
    }

    @Override
    public InputSpec getInputSpec() {
        return (new InputSpec())
                .setAuthenticationType(InputMandatory.MANDATORY)
                .setUsername(InputMandatory.MANDATORY)
                .setPassword(InputMandatory.MANDATORY)
                .setCatalog(InputMandatory.NONE)
                .setSid(InputMandatory.NONE)
                .setDatabase(InputMandatory.NONE);
    }

    @Override
    public boolean isSupportImplementor(String implementor) {
        return implementor.toUpperCase().equals(this.getImplementor().toUpperCase());
    }

    @Override
    public String getDriverClass(JdbcConnectInformation jdbcConnectInformation) {
        return "org.neo4j.driver.v1.Driver";
    }

    @Override
    public String getConnectorClass(JdbcConnectInformation jdbcConnectInformation) {
        return "app.metatron.discovery.domain.dataconnection.connector.Neo4jJdbcConnector";
    }

    @Override
    public String getDataAccessorClass(JdbcConnectInformation jdbcConnectInformation) {
        return "app.metatron.discovery.domain.dataconnection.accessor.Neo4jDataAccessor";
    }

    @Override
    public String getConnectUrl(JdbcConnectInformation connectInformation) {
        return makeConnectUrl(connectInformation, connectInformation.getDatabase(), true);
    }

    @Override
    public String makeConnectUrl(JdbcConnectInformation connectInformation, String s, boolean b) {
        if(StringUtils.isNotEmpty(connectInformation.getUrl())) {
          return connectInformation.getUrl();
        }

        StringBuilder builder = new StringBuilder();
        builder.append(NEO4J_URL_PREFIX);

        // Set HostName
        builder.append(URL_SEP);
        builder.append(connectInformation.getHostname());

        // Set Port
        if(connectInformation.getPort() != null) {
          builder.append(":").append(connectInformation.getPort());
        }
        System.out.println(builder.toString());
        return builder.toString();
    }

    @Override
    public String getTestQuery(JdbcConnectInformation jdbcConnectInformation) {
        return "MATCH (N) RETURN N";
    }

    @Override
    public String getDataBaseQuery(JdbcConnectInformation jdbcConnectInformation, String s, String s1, List<String> list, Integer integer, Integer integer1) {
        return null;
    }

    @Override
    public String getDataBaseCountQuery(JdbcConnectInformation jdbcConnectInformation, String s, String s1, List<String> list) {
        return null;
    }

    @Override
    public String getUseDatabaseQuery(JdbcConnectInformation jdbcConnectInformation, String s) {
        return null;
    }

    @Override
    public String[] getDefaultExcludeSchemas(JdbcConnectInformation jdbcConnectInformation) {
        return new String[0];
    }

    @Override
    public String getTableNameQuery(JdbcConnectInformation jdbcConnectInformation, String s, String s1) {
        return null;
    }

    @Override
    public String getTableQuery(JdbcConnectInformation jdbcConnectInformation, String s, String s1, String s2, List<String> list, Integer integer, Integer integer1) {
        return null;
    }

    @Override
    public String getTableCountQuery(JdbcConnectInformation jdbcConnectInformation, String s, String s1, String s2, List<String> list) {
        return null;
    }

    @Override
    public String getTableDescQuery(JdbcConnectInformation jdbcConnectInformation, String s, String s1, String s2) {
        return null;
    }

    @Override
    public String[] getDefaultExcludeTables(JdbcConnectInformation jdbcConnectInformation) {
        return new String[0];
    }

    @Override
    public String[] getResultSetTableType(JdbcConnectInformation jdbcConnectInformation) {
        return new String[0];
    }

    @Override
    public String getColumnQuery(JdbcConnectInformation jdbcConnectInformation, String s, String s1, String s2, String s3, Integer integer, Integer integer1) {
        return null;
    }

    @Override
    public String getColumnCountQuery(JdbcConnectInformation jdbcConnectInformation, String s, String s1, String s2, String s3) {
        return null;
    }

    @Override
    public FunctionWithException<Object, Object, SQLException> resultObjectConverter() throws SQLException {
        return null;
    }

    @Override
    public String getTableName(JdbcConnectInformation jdbcConnectInformation, String s, String s1, String s2) {
        return null;
    }

    @Override
    public String getQuotedFieldName(JdbcConnectInformation jdbcConnectInformation, String s) {
        return null;
    }

    @Override
    public String getDefaultTimeFormat(JdbcConnectInformation jdbcConnectInformation) {
        return null;
    }

    @Override
    public String getCharToDateStmt(JdbcConnectInformation jdbcConnectInformation, String s, String s1) {
        return null;
    }

    @Override
    public String getCharToUnixTimeStmt(JdbcConnectInformation jdbcConnectInformation, String s) {
        return null;
    }
}
